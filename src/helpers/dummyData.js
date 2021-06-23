export const dataAdmin = [
  {
    id: '001',
    name: 'Hana Tania',
    role: 'superadmin',
    email: 'superadmin@gmail.com',
    status: 'Active'
  },
  {
    id: '002',
    name: 'Felicia Tedja',
    role: 'superadmin',
    email: 'superadmin2@gmail.com',
    status: 'Inactive'
  }
];

export const dataUser = [
  {
    id: '001',
    name: 'Hana Tania',
    role: 'superadmin',
    email: 'superadmin@gmail.com',
    phonenumber: '+6284646473'
  },
  {
    id: '002',
    name: 'Felicia Tedja',
    role: 'superadmin',
    email: 'superadmin2@gmail.com',
    phonenumber: '+6254748383'
  }
];

export const dataAtribut = [
  {
    id: '001',
    atributname: 'Thread Size',
    atributid: '12345'
    // image: 'gambar01'
  },
  {
    id: '002',
    atributname: 'Min. Thick. (For Outer Panel)',
    atributid: '747464'
    // image: 'gambar02'
  }
];

export const dataCategory = [
  {
    id: '001',
    groupcategory: '01234',
    categoryname: 'Threaded Rods & Studs',
    categoryid: '0987'
  },
  {
    id: '002',
    groupcategory: '5678',
    categoryname: 'Eyebolts',
    categoryid: '2109'
  }
];

export const dataGroupCategory = [
  {
    id: '001',
    groupcategory: 'Abrading & Polishing',
    code: '0987'
  },
  {
    id: '001',
    groupcategory: 'Filtering',
    code: '6543'
  }
];

export const dataAmanah = [
  {
    id: '05432',
    name: 'Aan Kurniawan Ningsih',
    nik: '31740168302950006',
    amf_branch: 'Ciseeng',
    total: '5.457.500',
    cash: '457.500',
    ofMember: '15',
    status: 'approved',
    role: 'superadmin',
    email: 'superadmin@gmail.com',
    job: 'admin amartha beyond'
  },
  {
    id: '06431',
    name: 'Dewi Aditya',
    nik: '17401663029500353',
    amf_branch: 'Ciseeng',
    total: '10.457.500',
    cash: '600.000',
    ofMember: '15',
    status: 'Approved',
    role: 'superadmin',
    email: 'superadmin2@gmail.com',
    job: '-'
  }
];

export const dataListMemberAmanah = [
  {
    id: '15432',
    name: 'Anggia Sulistia',
    nik: '31740168302950006',
    phone: '085645533667',
    memberStatus: 'Teman Amartha',
    status: 'active'
  },
  {
    id: '15431',
    name: 'Diah Purnamasari',
    nik: '31740168302950006',
    phone: '085645533667',
    memberStatus: 'Teman Amartha',
    status: 'active'
  }
];

export const dataSaving = [
  {
    saving_id: '05432/004',
    saving_plan_id: 'DCS/20190703/40/429000/1',
    ibu_amanah_name: 'Aan Kurniawan Ningsih',
    product_id: '2',
    saving_target: 1500000,
    current_saving: 500000,
    po_name: 'Belanja Mingguan Gru...',
    po_date: '12/8/2019',
    saving_period: 'Daily',
    amf_branch: 'Ciseeng',
    status: 'On Progress',
    member: [],
    member_id: '1',
    qty_product_member: '11',
    member_name: 'Rabiatul Aadawiyah',
    member_img: '/public/images/image.png',
    total_saving: '35000',
    setoran: ['12/8/2019', '12/8/2019', '12/8/2019', '12/8/2019'],
    subtotal: '350000',
    shopping_detail_member: [
      {
        shopping_id: 1,
        product_name: 'ddd',
        qty_product_member: '5',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 2,
        product_name: 'dd',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 3,
        product_name: 'ffff',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      }
    ],
    product: [],
    merchant_id: 'M432',
    product_name: 'CAP LANG Minyak Kayu...',
    product_img: '/public/images/product.svg',
    brand: 'BANGO',
    sku_amf: '100256390',
    price: '10000',
    total_price: '',
    qty_product: '18',
    payment_date: '12/8/2019',
    saving_amount: '50000',
    setoran_ke: '1',
    status_history: 'Received'
  },
  {
    saving_id: '05432/004',
    saving_plan_id: 'DCS/20190703/40/429000/1',
    ibu_amanah_name: 'Aan Kurniawan Ningsih',
    product_id: '1',
    saving_target: 1500000,
    current_saving: 500000,
    po_name: 'Belanja Mingguan Gru...',
    po_date: '12/8/2019',
    saving_period: 'Daily',
    amf_branch: 'Ciseeng',
    status: 'Completed',
    member: [],
    member_id: '2',
    qty_product_member: '11',
    member_name: 'Rabiatul Aadawiyah',
    member_img: '/public/images/image.png',
    total_saving: '35000',
    setoran: ['12/8/2019', '12/8/2019', '12/8/2019', '12/8/2019'],
    subtotal: '350000',
    shopping_detail_member: [
      {
        shopping_id: 1,
        product_name: 'ddd',
        qty_product_member: '5',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 2,
        product_name: 'dd',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 3,
        product_name: 'ffff',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      }
    ],
    product: [],
    merchant_id: 'M432',
    product_name: 'CAP LANG Minyak Kayu...',
    product_img: '/public/images/product.svg',
    brand: 'BANGO',
    sku_amf: '100256390',
    price: '10000',
    total_price: '',
    qty_product: '18',
    payment_date: '12/8/2019',
    saving_amount: '50000',
    setoran_ke: '1',
    status_history: 'Withdrawn'
  },
  {
    saving_id: '05432/004',
    saving_plan_id: 'DCS/20190703/40/429000/1',
    ibu_amanah_name: 'Aan Kurniawan Ningsih',
    product_id: '1',
    saving_target: 1500000,
    current_saving: 500000,
    po_name: 'Belanja Mingguan Gru...',
    po_date: '12/8/2019',
    saving_period: 'Daily',
    amf_branch: 'Ciseeng',
    status: 'Cancel',
    member: [],
    member_id: '3',
    qty_product_member: '11',
    member_name: 'Rabiatul Aadawiyah',
    member_img: '/public/images/image.png',
    total_saving: '35000',
    setoran: ['12/8/2019', '12/8/2019', '12/8/2019', '12/8/2019'],
    subtotal: '350000',
    shopping_detail_member: [
      {
        shopping_id: 1,
        product_name: 'ddd',
        qty_product_member: '5',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 2,
        product_name: 'dd',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      },
      {
        shopping_id: 3,
        product_name: 'ffff',
        qty_product_member: '6',
        price: '444',
        total_price: '2000'
      }
    ],
    product: [],
    merchant_id: 'M432',
    product_name: 'CAP LANG Minyak Kayu...',
    product_img: '/public/images/product.svg',
    brand: 'BANGO',
    sku_amf: '100256390',
    price: '10000',
    total_price: '',
    qty_product: '18',
    payment_date: '12/8/2019',
    saving_amount: '50000',
    setoran_ke: '1',
    status_history: 'Received'
  }
];

export const dataGroupBuying = [
  {
    id: '15432',
    name: 'Anggia Sulistia',
    ibuAmanah: 'Aan Kurniawan Ningsih',
    nik: '31740168302950006',
    memberStatus: 'Teman Amartha',
    totalSaving: '450.000',
    ofPo: '4',
    status: 'active'
  },
  {
    id: '15431',
    name: 'Diah Purnamasari',
    ibuAmanah: 'Aan Kurniawan Ningsih',
    nik: '31740168302950006',
    memberStatus: 'Teman Amartha',
    totalSaving: '450.000',
    ofPo: '1',
    status: 'active'
  }
];

export const dataSeller = [
  {
    id: 'M432',
    name: 'Toko Ibu Laksmi',
    owner: 'Laksmi Nurjanah',
    phone: '085644556677',
    district: 'Bogor',
    amfBranch: 'Ciseeng',
    total: '15.457.500',
    status: 'active'
  },
  {
    id: 'M431',
    name: 'Lotte Grosir',
    owner: 'Bambang Purwanto',
    phone: '085644556677',
    district: 'Bogor',
    amfBranch: 'Ciseeng',
    total: '15.457.500',
    status: 'active'
  }
];

export const dataSellerHistory = [
  {
    id: 'PO 060619/TIL222/BGR/0023',
    name: 'Anggia Sulistia',
    total: '457.500',
    status: 'active',
    fee: '0',
    sold: '10'
  },
  {
    id: 'PO 060619/TIL222/BGR/0023',
    name: 'Diah Purnamasari',
    total: '10.000',
    status: 'active',
    fee: '10.000',
    sold: '12'
  }
];

export const dataSellerProduct = [
  {
    id: 'M432',
    name: 'BANGO Pouch Flatpack...',
    category: 'Bahan Masak',
    brand: 'BANGO',
    amfBranch: 'Ciseeng',
    stock: '50',
    price: '10.000',
    salePrice: '10.000',
    sold: '115',
    product_img: '/public/images/product.svg'
  },
  {
    id: 'M432',
    name: 'CAP LANG Minyak Kayu...',
    category: 'Kesehatan',
    brand: 'CAP LANG',
    amfBranch: 'Ciseeng',
    stock: '100',
    price: '37.000',
    salePrice: '35.000',
    sold: '6',
    product_img: '/public/images/product.svg'
  }
];

export const dataProduct = [
  {
    id: 'M432',
    name: 'BANGO Pouch Flatpack...',
    category: 'Bahan Masak',
    brand: 'BANGO',
    amfBranch: 'Ciseeng',
    stock: '50',
    price: '10.000',
    salePrice: '10.000',
    sold: '115',
    product_img: '/public/images/product.svg'
  },
  {
    id: 'M432',
    name: 'CAP LANG Minyak Kayu...',
    category: 'Kesehatan',
    brand: 'CAP LANG',
    amfBranch: 'Ciseeng',
    stock: '100',
    price: '37.000',
    salePrice: '35.000',
    sold: '6',
    product_img: '/public/images/product.svg'
  }
];

export const dataProductHistory = [
  {
    id: 'PO 060619/TIL222/BGR/0023',
    name: 'Anggia Sulistia',
    total: '457.500',
    status: 'active',
    fee: '0',
    sold: '10'
  },
  {
    id: 'PO 060618/TIL222/BGR/0023',
    name: 'Diah Purnamasari',
    total: '10.000',
    status: 'active',
    fee: '10.000',
    sold: '12'
  }
];

export const dataProductCategory = [
  {
    id: '1',
    name: 'Makanan',
    total: '5329',
    status: 'active'
  },
  {
    id: '2',
    name: 'Minuman',
    total: '329',
    status: 'active'
  },
  {
    id: '3',
    name: 'Rumah Tangga',
    total: '1232',
    status: 'active'
  }
];

export const dataSms = [
  {
    id: '1',
    title: 'Registration',
    last_updated: '12/8/2019 12:00:54',
    message:
      'Halo Ibu [[Nama Anggota]], selamat telah bergabung menjadi anggota belanja Ibu	Mari memulai menabung dan belanja borongan bersama Amartha',
    status: 'active'
  },
  {
    id: '2',
    title: 'Saving',
    last_updated: '12/8/2019 12:00:54',
    message:
      'Halo Ibu [[Nama Anggota]], selamat telah bergabung menjadi anggota belanja Ibu [[Nama Ibu Amanah]]. Mari memulai menabung dan belanja borongan bersama Amartha.',
    status: 'inactive'
  },
  {
    id: '3',
    title: 'Order',
    last_updated: '12/8/2019 12:00:54',
    message:
      'Halo Ibu [[Nama Anggota]], selamat telah bergabung menjadi anggota belanja Ibu [[Nama Ibu Amanah]]. Mari memulai menabung dan belanja borongan bersama Amartha.',
    status: 'active'
  }
];

export const dataTransaction = [
  {
    id: 0,
    name: 'Dewi Febriyanti',
    trans_number: 98765,
    created_at: '12/10/2019 12:00:54',
    price: 100000,
    status: 0,
    updated_at: '12/10/2019 12:00:54'
  },
  {
    id: 1,
    name: 'Hana Tania',
    trans_number: 810841,
    created_at: '12/10/2019 12:00:54',
    price: 50000,
    status: 1,
    updated_at: '12/10/2019 12:00:54'
  },
  {
    id: 2,
    name: 'Felicia Tedja',
    trans_number: 53212,
    created_at: '12/10/2019 12:00:54',
    price: 20000,
    status: 2,
    updated_at: '12/10/2019 12:00:54'
  },
  {
    id: 3,
    name: 'Hana Tania',
    trans_number: 514216,
    created_at: '12/10/2019 12:00:54',
    price: 20000,
    status: 3,
    updated_at: '12/10/2019 12:00:54'
  },
  {
    id: 4,
    name: 'Dewi Febriyanti',
    trans_number: 7632453,
    created_at: '12/10/2019 12:00:54',
    price: 20000,
    status: 4,
    updated_at: '12/10/2019 12:00:54'
  }
];

const data1 = {
  name: 'Abrading & Polishing',
  image: '/public/images/product/product_1.png',
  quantity: 3,
  price: 20000
};

export const dataTransactionHistory = Array(3).fill(data1);
