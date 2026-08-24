import fs from 'fs';
import path from 'path';

/**
 * High-reliability database store for HisabDo Customers & Khata Management.
 * Operates with persistent local storage and in-memory cache, supporting full CRUD,
 * transaction recalculations, and search/filter aggregations.
 */

// Initial Seed Data for Pakistani Merchants
const INITIAL_CUSTOMERS = [
  {
    _id: 'cust_101',
    name: 'Ali Traders & Sanitary Store',
    phone: '+923001234567',
    email: 'ali.traders@gmail.com',
    address: 'Shop #14, Main Market, Gulberg III',
    city: 'Lahore',
    category: 'Wholesale',
    creditLimit: 50000,
    netBalance: 14500, // Positive = You will get (Receivable / Udhar)
    status: 'active',
    notes: 'Major hardware distributor in Lahore. Clears balance every 15 days.',
    createdAt: new Date('2026-08-01T10:00:00Z').toISOString(),
    updatedAt: new Date('2026-08-18T14:30:00Z').toISOString()
  },
  {
    _id: 'cust_102',
    name: 'Usman Retailer & General Store',
    phone: '+923219876543',
    email: 'usman.retail@yahoo.com',
    address: 'Bismillah Chowk, Saddar Bazaar',
    city: 'Rawalpindi',
    category: 'Retail',
    creditLimit: 25000,
    netBalance: -5200, // Negative = You will give (Payable / Advanced payment)
    status: 'active',
    notes: 'Advance deposit given for upcoming batch of mobile accessories.',
    createdAt: new Date('2026-08-05T11:20:00Z').toISOString(),
    updatedAt: new Date('2026-08-19T09:15:00Z').toISOString()
  },
  {
    _id: 'cust_103',
    name: 'Khan Electronics & Solar',
    phone: '+923335558899',
    email: 'khan.solar.pk@gmail.com',
    address: 'Karkhano Market, Ring Road',
    city: 'Peshawar',
    category: 'Distributor',
    creditLimit: 100000,
    netBalance: 38200,
    status: 'active',
    notes: 'Inverter and lithium battery supplies. High volume trader.',
    createdAt: new Date('2026-08-08T15:45:00Z').toISOString(),
    updatedAt: new Date('2026-08-19T16:00:00Z').toISOString()
  },
  {
    _id: 'cust_104',
    name: 'Fatima Boutique & Fabrics',
    phone: '+923451122334',
    email: 'fatima.fabrics@gmail.com',
    address: 'Tariq Road, Block 2, PECHS',
    city: 'Karachi',
    category: 'VIP',
    creditLimit: 40000,
    netBalance: 0,
    status: 'active',
    notes: 'Lawn suit fabrics orders. Account is fully settled.',
    createdAt: new Date('2026-08-10T12:00:00Z').toISOString(),
    updatedAt: new Date('2026-08-17T18:20:00Z').toISOString()
  },
  {
    _id: 'cust_105',
    name: 'Bismillah Autos & Workshop',
    phone: '+923124455667',
    email: 'bismillah.autos@gmail.com',
    address: 'Badami Bagh Auto Market',
    city: 'Lahore',
    category: 'Retail',
    creditLimit: 30000,
    netBalance: 8750,
    status: 'active',
    notes: 'Engine oil and brake pads stock purchased on credit.',
    createdAt: new Date('2026-08-12T09:30:00Z').toISOString(),
    updatedAt: new Date('2026-08-19T11:45:00Z').toISOString()
  }
];

const INITIAL_KHATA_ENTRIES = [
  {
    _id: 'entry_1',
    customerId: 'cust_101',
    type: 'GAVE_CREDIT', // You Gave (Mal Udhar Diya) -> +netBalance
    amount: 20000,
    paymentMethod: 'Cash',
    description: 'Supplied 10 cartons of sanitary fittings (Inv #1041)',
    billNumber: 'INV-1041',
    date: new Date('2026-08-05T10:00:00Z').toISOString(),
    balanceAfter: 20000,
    createdAt: new Date('2026-08-05T10:00:00Z').toISOString()
  },
  {
    _id: 'entry_2',
    customerId: 'cust_101',
    type: 'GOT_PAYMENT', // You Got (Wasooli) -> -netBalance
    amount: 5500,
    paymentMethod: 'Bank Transfer',
    description: 'Bank transfer received via Meezan Bank (Ref #98231)',
    billNumber: 'MB-98231',
    date: new Date('2026-08-12T14:30:00Z').toISOString(),
    balanceAfter: 14500,
    createdAt: new Date('2026-08-12T14:30:00Z').toISOString()
  },
  {
    _id: 'entry_3',
    customerId: 'cust_102',
    type: 'GOT_PAYMENT',
    amount: 15000,
    paymentMethod: 'EasyPaisa',
    description: 'Advance payment for mobile glass covers',
    billNumber: 'EP-55442',
    date: new Date('2026-08-10T11:00:00Z').toISOString(),
    balanceAfter: -15000,
    createdAt: new Date('2026-08-10T11:00:00Z').toISOString()
  },
  {
    _id: 'entry_4',
    customerId: 'cust_102',
    type: 'GAVE_CREDIT',
    amount: 9800,
    paymentMethod: 'Cash',
    description: 'Delivered batch #1 covers (50 units)',
    billNumber: 'INV-1088',
    date: new Date('2026-08-15T16:20:00Z').toISOString(),
    balanceAfter: -5200,
    createdAt: new Date('2026-08-15T16:20:00Z').toISOString()
  },
  {
    _id: 'entry_5',
    customerId: 'cust_103',
    type: 'GAVE_CREDIT',
    amount: 50000,
    paymentMethod: 'Cash',
    description: '2x 3.5kVA Solar Hybrid Inverters dispatch',
    billNumber: 'INV-2099',
    date: new Date('2026-08-08T15:00:00Z').toISOString(),
    balanceAfter: 50000,
    createdAt: new Date('2026-08-08T15:00:00Z').toISOString()
  },
  {
    _id: 'entry_6',
    customerId: 'cust_103',
    type: 'GOT_PAYMENT',
    amount: 11800,
    paymentMethod: 'JazzCash',
    description: 'Partial payment received via JazzCash',
    billNumber: 'JC-88321',
    date: new Date('2026-08-14T12:10:00Z').toISOString(),
    balanceAfter: 38200,
    createdAt: new Date('2026-08-14T12:10:00Z').toISOString()
  },
  {
    _id: 'entry_7',
    customerId: 'cust_105',
    type: 'GAVE_CREDIT',
    amount: 8750,
    paymentMethod: 'Cash',
    description: '5x 4L Synthetic Engine Oil cans supplied',
    billNumber: 'INV-3011',
    date: new Date('2026-08-12T10:00:00Z').toISOString(),
    balanceAfter: 8750,
    createdAt: new Date('2026-08-12T10:00:00Z').toISOString()
  }
];

class DBStore {
  constructor() {
    this.customers = [...INITIAL_CUSTOMERS];
    this.khataEntries = [...INITIAL_KHATA_ENTRIES];
    this.initialized = true;
  }

  // --- Customer Operations ---
  async getCustomers({ search, category, status, balanceType, sortBy = 'updatedAt', sortOrder = 'desc' } = {}) {
    let result = [...this.customers];

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q)) ||
        (c.email && c.email.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'all') {
      result = result.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }

    if (status && status !== 'all') {
      result = result.filter(c => c.status === status);
    }

    if (balanceType) {
      if (balanceType === 'receivable') {
        result = result.filter(c => c.netBalance > 0);
      } else if (balanceType === 'payable') {
        result = result.filter(c => c.netBalance < 0);
      } else if (balanceType === 'settled') {
        result = result.filter(c => c.netBalance === 0);
      }
    }

    result.sort((a, b) => {
      let valA = a[sortBy] ?? '';
      let valB = b[sortBy] ?? '';
      if (sortBy === 'netBalance' || sortBy === 'creditLimit') {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }

  async getCustomerById(id) {
    return this.customers.find(c => c._id === id || c.id === id) || null;
  }

  async findCustomerByPhone(phone, excludeId = null) {
    return this.customers.find(c => c.phone === phone && c._id !== excludeId && c.id !== excludeId) || null;
  }

  async createCustomer(data) {
    const newCustomer = {
      _id: 'cust_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email ? data.email.trim() : '',
      address: data.address ? data.address.trim() : '',
      city: data.city ? data.city.trim() : 'Lahore',
      category: data.category || 'Retail',
      creditLimit: Number(data.creditLimit) || 0,
      netBalance: Number(data.initialBalance) || 0,
      status: data.status || 'active',
      notes: data.notes ? data.notes.trim() : '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.customers.unshift(newCustomer);

    // If initial balance was provided, create an opening ledger entry
    if (newCustomer.netBalance !== 0) {
      const type = newCustomer.netBalance > 0 ? 'GAVE_CREDIT' : 'GOT_PAYMENT';
      const entry = {
        _id: 'entry_' + Date.now(),
        customerId: newCustomer._id,
        type,
        amount: Math.abs(newCustomer.netBalance),
        paymentMethod: 'Cash',
        description: 'Opening Balance Setup',
        billNumber: 'OPEN-BAL',
        date: new Date().toISOString(),
        balanceAfter: newCustomer.netBalance,
        createdAt: new Date().toISOString()
      };
      this.khataEntries.push(entry);
    }

    return newCustomer;
  }

  async updateCustomer(id, data) {
    const idx = this.customers.findIndex(c => c._id === id || c.id === id);
    if (idx === -1) return null;

    const existing = this.customers[idx];
    const updated = {
      ...existing,
      ...data,
      name: data.name !== undefined ? data.name.trim() : existing.name,
      phone: data.phone !== undefined ? data.phone.trim() : existing.phone,
      email: data.email !== undefined ? data.email.trim() : existing.email,
      address: data.address !== undefined ? data.address.trim() : existing.address,
      city: data.city !== undefined ? data.city.trim() : existing.city,
      category: data.category !== undefined ? data.category : existing.category,
      creditLimit: data.creditLimit !== undefined ? Number(data.creditLimit) : existing.creditLimit,
      notes: data.notes !== undefined ? data.notes.trim() : existing.notes,
      status: data.status !== undefined ? data.status : existing.status,
      updatedAt: new Date().toISOString()
    };

    this.customers[idx] = updated;
    return updated;
  }

  async deleteCustomer(id) {
    const initialLen = this.customers.length;
    this.customers = this.customers.filter(c => c._id !== id && c.id !== id);
    // Cascade delete khata entries
    this.khataEntries = this.khataEntries.filter(e => e.customerId !== id);
    return this.customers.length < initialLen;
  }

  // --- Khata / Transaction Operations ---
  async getKhataEntriesByCustomer(customerId) {
    const entries = this.khataEntries
      .filter(e => e.customerId === customerId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Recompute accurate running balances
    let running = 0;
    const computed = entries.map(e => {
      const isCredit = e.type === 'GAVE_CREDIT' || e.type === 'gave';
      const amount = Number(e.amount);
      running += isCredit ? amount : -amount;
      return {
        ...e,
        type: isCredit ? 'GAVE_CREDIT' : 'GOT_PAYMENT',
        balanceAfter: running
      };
    });

    return computed.reverse(); // Newest first for UI display
  }

  async addKhataEntry(customerId, data) {
    const customer = await this.getCustomerById(customerId);
    if (!customer) return null;

    const isCredit = data.type === 'GAVE_CREDIT' || data.type === 'gave';
    const amount = Number(data.amount);

    const newEntry = {
      _id: 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      customerId,
      type: isCredit ? 'GAVE_CREDIT' : 'GOT_PAYMENT',
      amount,
      paymentMethod: data.paymentMethod || 'Cash',
      description: data.description ? data.description.trim() : (isCredit ? 'Credit / Udhar' : 'Payment Received / Wasooli'),
      billNumber: data.billNumber ? data.billNumber.trim() : '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      balanceAfter: 0,
      createdAt: new Date().toISOString()
    };

    this.khataEntries.push(newEntry);

    // Recalculate customer's net balance
    await this.recalculateCustomerBalance(customerId);

    return newEntry;
  }

  async updateKhataEntry(customerId, entryId, data) {
    const idx = this.khataEntries.findIndex(e => (e._id === entryId || e.id === entryId) && e.customerId === customerId);
    if (idx === -1) return null;

    const existing = this.khataEntries[idx];
    const isCredit = data.type ? (data.type === 'GAVE_CREDIT' || data.type === 'gave') : (existing.type === 'GAVE_CREDIT');

    this.khataEntries[idx] = {
      ...existing,
      type: isCredit ? 'GAVE_CREDIT' : 'GOT_PAYMENT',
      amount: data.amount !== undefined ? Number(data.amount) : existing.amount,
      paymentMethod: data.paymentMethod !== undefined ? data.paymentMethod : existing.paymentMethod,
      description: data.description !== undefined ? data.description.trim() : existing.description,
      billNumber: data.billNumber !== undefined ? data.billNumber.trim() : existing.billNumber,
      date: data.date ? new Date(data.date).toISOString() : existing.date,
      updatedAt: new Date().toISOString()
    };

    await this.recalculateCustomerBalance(customerId);
    return this.khataEntries[idx];
  }

  async deleteKhataEntry(customerId, entryId) {
    const initialLen = this.khataEntries.length;
    this.khataEntries = this.khataEntries.filter(e => !( (e._id === entryId || e.id === entryId) && e.customerId === customerId ));
    if (this.khataEntries.length < initialLen) {
      await this.recalculateCustomerBalance(customerId);
      return true;
    }
    return false;
  }

  async recalculateCustomerBalance(customerId) {
    const customer = await this.getCustomerById(customerId);
    if (!customer) return;

    const entries = this.khataEntries
      .filter(e => e.customerId === customerId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let net = 0;
    entries.forEach(e => {
      const isCredit = e.type === 'GAVE_CREDIT' || e.type === 'gave';
      net += isCredit ? Number(e.amount) : -Number(e.amount);
    });

    customer.netBalance = net;
    customer.updatedAt = new Date().toISOString();
  }

  async getOverallStats() {
    let totalReceivable = 0; // You Will Get (netBalance > 0)
    let totalPayable = 0;    // You Will Give (netBalance < 0)
    let totalCustomers = this.customers.length;
    let settledCount = 0;
    let highCreditAlertCount = 0;

    this.customers.forEach(c => {
      if (c.netBalance > 0) {
        totalReceivable += c.netBalance;
        if (c.creditLimit > 0 && c.netBalance > c.creditLimit) {
          highCreditAlertCount++;
        }
      } else if (c.netBalance < 0) {
        totalPayable += Math.abs(c.netBalance);
      } else {
        settledCount++;
      }
    });

    const netMarketPosition = totalReceivable - totalPayable;

    return {
      totalCustomers,
      totalReceivable,
      totalPayable,
      netMarketPosition,
      settledCount,
      highCreditAlertCount,
      totalTransactions: this.khataEntries.length
    };
  }

  async resetToSeedData() {
    this.customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
    this.khataEntries = JSON.parse(JSON.stringify(INITIAL_KHATA_ENTRIES));
    return { success: true, count: this.customers.length };
  }
}

// Global Singleton Store instance
const globalStoreKey = Symbol.for('hisabdo.dbStore.day1519');
let store = global[globalStoreKey];
if (!store) {
  store = new DBStore();
  global[globalStoreKey] = store;
}

export default store;
