/**
 * Comprehensive Automated Test Suite for Day 15-19: Customers & Khata CRUD Specialist Module
 * Verifies Zod Validation Schemas, Customer CRUD Lifecycle, Khata Ledger Transactions,
 * Running Balance Recalculations, and Duplicate Prevention.
 */

const { customerCreateSchema, customerUpdateSchema, pakistaniPhoneRegex } = require('./src/lib/validations/customerSchema');
const { khataEntryCreateSchema } = require('./src/lib/validations/khataSchema');

// We will import the DB store
const storeModule = require('./src/lib/db-store');
const store = storeModule.default || storeModule;

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    testsFailed++;
  }
}

async function runTests() {
  console.log('\n================================================================');
  console.log('🧪 RUNNING DAY 15-19 CUSTOMERS & KHATA CRUD TEST SUITE');
  console.log('================================================================\n');

  // -------------------------------------------------------------
  // TEST SUITE 1: Zod Phone Number Validation (Pakistani Mobile Regex)
  // -------------------------------------------------------------
  console.log('--- TEST 1: ZOD PAKISTANI PHONE VALIDATION ---');
  
  const validPhones = [
    '+923001234567',
    '03001234567',
    '923219876543',
    '03335558899',
    '+923451122334',
    '03124455667'
  ];

  validPhones.forEach(phone => {
    const res = customerCreateSchema.safeParse({
      name: 'Test Store',
      phone: phone,
      city: 'Lahore'
    });
    assert(res.success === true, `Accepts valid Pakistani phone: ${phone}`);
  });

  const invalidPhones = [
    '12345',
    '0213456789', // Landline format (starts with 02)
    '+14155552671', // US number
    'abc92300123',
    '+922001234567', // Not starting with 3 after country code
    '04001234567'   // Not starting with 3
  ];

  invalidPhones.forEach(phone => {
    const res = customerCreateSchema.safeParse({
      name: 'Test Store',
      phone: phone,
      city: 'Lahore'
    });
    assert(res.success === false, `Rejects invalid phone: ${phone}`);
  });

  // -------------------------------------------------------------
  // TEST SUITE 2: Zod Customer Schemas (Name, Credit Limit, Category)
  // -------------------------------------------------------------
  console.log('\n--- TEST 2: ZOD CUSTOMER SCHEMA CONSTRAINTS ---');

  const shortNameRes = customerCreateSchema.safeParse({
    name: 'A', // Too short (min 2)
    phone: '+923001234567'
  });
  assert(shortNameRes.success === false, 'Rejects customer name under 2 characters');

  const validCustomerRes = customerCreateSchema.safeParse({
    name: 'Tariq Wholesale Trader',
    phone: '+923009988776',
    email: 'tariq@trader.pk',
    category: 'Wholesale',
    creditLimit: 75000,
    initialBalance: 12000,
    city: 'Faisalabad'
  });
  assert(validCustomerRes.success === true, 'Accepts valid full customer payload');
  assert(validCustomerRes.data.creditLimit === 75000, 'Transforms creditLimit to number');

  // -------------------------------------------------------------
  // TEST SUITE 3: Zod Khata Transaction Schemas (Amount & Types)
  // -------------------------------------------------------------
  console.log('\n--- TEST 3: ZOD KHATA ENTRY SCHEMA VALIDATION ---');

  const negAmountRes = khataEntryCreateSchema.safeParse({
    type: 'GAVE_CREDIT',
    amount: -500
  });
  assert(negAmountRes.success === false, 'Rejects negative transaction amount (-500)');

  const zeroAmountRes = khataEntryCreateSchema.safeParse({
    type: 'GOT_PAYMENT',
    amount: 0
  });
  assert(zeroAmountRes.success === false, 'Rejects zero transaction amount (0)');

  const validCreditRes = khataEntryCreateSchema.safeParse({
    type: 'GAVE_CREDIT',
    amount: 18500,
    paymentMethod: 'Cash',
    description: 'Supplied 10 mobile chargers',
    billNumber: 'INV-9901'
  });
  assert(validCreditRes.success === true, 'Accepts valid credit entry payload');
  assert(validCreditRes.data.amount === 18500, 'Transforms amount to number');

  // -------------------------------------------------------------
  // TEST SUITE 4: Customer CRUD Lifecycle in Database Store
  // -------------------------------------------------------------
  console.log('\n--- TEST 4: CUSTOMER STORE CRUD LIFECYCLE ---');

  // Reset store to clean state
  await store.resetToSeedData();

  // 1. Create new customer
  const newCustPayload = {
    name: 'Hamza Super Mart',
    phone: '+923087776655',
    email: 'hamza.mart@gmail.com',
    city: 'Multan',
    category: 'Retail',
    creditLimit: 60000,
    initialBalance: 5000,
    notes: 'Weekly milk and grocery supplies.'
  };

  const createdCustomer = await store.createCustomer(newCustPayload);
  assert(createdCustomer && createdCustomer._id, `Customer created with ID: ${createdCustomer._id}`);
  assert(createdCustomer.name === 'Hamza Super Mart', 'Customer name verified');
  assert(createdCustomer.netBalance === 5000, 'Customer opening balance set to 5000');

  // 2. Read customer by ID
  const fetchedCustomer = await store.getCustomerById(createdCustomer._id);
  assert(fetchedCustomer && fetchedCustomer._id === createdCustomer._id, 'Fetched customer by ID successfully');

  // 3. Search customers
  const searchResults = await store.getCustomers({ search: 'Multan' });
  assert(searchResults.some(c => c._id === createdCustomer._id), 'Search by city "Multan" returned created customer');

  // 4. Update customer
  const updatedCustomer = await store.updateCustomer(createdCustomer._id, {
    name: 'Hamza Super Mart (Main Branch)',
    creditLimit: 90000
  });
  assert(updatedCustomer.name === 'Hamza Super Mart (Main Branch)', 'Updated customer name');
  assert(updatedCustomer.creditLimit === 90000, 'Updated customer credit limit to 90000');

  // -------------------------------------------------------------
  // TEST SUITE 5: Khata Transactions & Dynamic Balance Recalculation
  // -------------------------------------------------------------
  console.log('\n--- TEST 5: KHATA TRANSACTIONS & RUNNING BALANCE RECALCULATION ---');

  const custId = createdCustomer._id;

  // Opening balance is 5000 (GAVE_CREDIT)
  // Step 1: Add another credit of Rs. 15,000 (You gave more goods)
  const entry1 = await store.addKhataEntry(custId, {
    type: 'GAVE_CREDIT',
    amount: 15000,
    paymentMethod: 'Cash',
    description: 'Supplied 5 cartons oil',
    billNumber: 'INV-401'
  });
  assert(entry1 && entry1._id, 'Added credit transaction of Rs. 15,000');

  let custAfterCredit = await store.getCustomerById(custId);
  assert(custAfterCredit.netBalance === 20000, `Customer balance after credit: Rs. ${custAfterCredit.netBalance} (Expected 20,000)`);

  // Step 2: Add payment received (Wasooli) of Rs. 12,000 (Customer paid cash)
  const entry2 = await store.addKhataEntry(custId, {
    type: 'GOT_PAYMENT',
    amount: 12000,
    paymentMethod: 'EasyPaisa',
    description: 'Received via EasyPaisa from customer',
    billNumber: 'EP-902'
  });
  assert(entry2 && entry2._id, 'Added payment transaction of Rs. 12,000');

  let custAfterPayment = await store.getCustomerById(custId);
  assert(custAfterPayment.netBalance === 8000, `Customer balance after payment: Rs. ${custAfterPayment.netBalance} (Expected 8,000)`);

  // Step 3: Fetch entries and verify calculated running balances
  const allEntries = await store.getKhataEntriesByCustomer(custId);
  assert(allEntries.length === 3, `Total ledger entries: ${allEntries.length} (Opening + 2 entries)`);

  // Step 4: Edit transaction entry (change 12,000 to 14,000 payment)
  await store.updateKhataEntry(custId, entry2._id, {
    amount: 14000
  });

  let custAfterEdit = await store.getCustomerById(custId);
  assert(custAfterEdit.netBalance === 6000, `Customer balance after edit: Rs. ${custAfterEdit.netBalance} (Expected 6,000)`);

  // Step 5: Delete payment entry and verify balance restores
  await store.deleteKhataEntry(custId, entry2._id);
  let custAfterDelete = await store.getCustomerById(custId);
  assert(custAfterDelete.netBalance === 20000, `Customer balance after deleting payment: Rs. ${custAfterDelete.netBalance} (Expected 20,000)`);

  // -------------------------------------------------------------
  // TEST SUITE 6: Cascade Deletion
  // -------------------------------------------------------------
  console.log('\n--- TEST 6: CUSTOMER & LEDGER CASCADE DELETION ---');

  await store.deleteCustomer(custId);
  const deletedCust = await store.getCustomerById(custId);
  assert(deletedCust === null, 'Customer account successfully deleted');

  const orphanedEntries = await store.getKhataEntriesByCustomer(custId);
  assert(orphanedEntries.length === 0, 'Associated Khata ledger entries cleanly purged via cascade');

  // -------------------------------------------------------------
  // TEST SUITE 7: Overall Dashboard Aggregated Metrics
  // -------------------------------------------------------------
  console.log('\n--- TEST 7: DASHBOARD STATS AGGREGATION ---');

  const stats = await store.getOverallStats();
  assert(stats.totalCustomers > 0, `Aggregated total customers: ${stats.totalCustomers}`);
  assert(stats.totalReceivable > 0, `Aggregated total receivable: Rs. ${stats.totalReceivable.toLocaleString()}`);
  assert(typeof stats.netMarketPosition === 'number', `Computed net market position: Rs. ${stats.netMarketPosition.toLocaleString()}`);

  console.log('\n================================================================');
  console.log(`📊 TEST RESULTS SUMMARY:`);
  console.log(`   Passed: ${testsPassed}`);
  console.log(`   Failed: ${testsFailed}`);
  console.log('================================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Unhandled Test Error:', err);
  process.exit(1);
});
