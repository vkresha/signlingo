export const signData: Record<string, Array<{
  id: string;
  word: string;
  description: string;
  videoUrl: string;
  instructions: string[];
  tips: string;
}>> = {

  'Salam & Perbualan Asas': [
  {
    id: 'hi',
    word: 'Hi',
    description: 'Salam ringkas untuk memulakan perbualan',
    videoUrl: '/videos/hi.mp4',
    instructions: [
      'Angkat satu tangan ke paras bahu',
      'Tapak tangan menghadap ke hadapan',
      'Lakukan gerakan melambai kecil',
    ],
    tips: 'Gunakan ekspresi muka yang mesra untuk menjadikan salam lebih sopan.',
  },
  {
    id: 'assalamualaikum',
    word: 'Assalamualaikum',
    description: 'Salam pembuka yang sopan',
    videoUrl: '/videos/assalamualaikum.mp4',
    instructions: [
      'Letakkan tangan kanan di hadapan dada',
      'Gerakkan tangan ke hadapan secara lembut',
    ],
    tips: 'Digunakan dalam situasi formal atau ketika bertemu orang buat kali pertama.',
  },
  {
    id: 'apa-khabar',
    word: 'Apa Khabar',
    description: 'Bertanya tentang keadaan seseorang',
    videoUrl: '/videos/apa khabar.mp4',
    instructions: [
      'Buat isyarat "apa"',
      'Ikuti dengan isyarat "khabar"',
    ],
    tips: 'Ekspresi muka penting untuk menunjukkan nada bertanya.',
  },
  {
    id: 'apa',
    word: 'Apa',
    description: 'Digunakan untuk bertanya soalan',
    videoUrl: '/videos/apa.mp4',
    instructions: [
      'Bentuk tangan dalam posisi bertanya',
      'Gerakkan tangan sedikit ke hadapan',
    ],
    tips: 'Biasanya digabungkan dengan ekspresi muka yang ingin tahu.',
  },
  {
    id: 'siapa',
    word: 'Siapa',
    description: 'Digunakan untuk bertanya tentang orang',
    videoUrl: '/videos/siapa.mp4',
    instructions: [
      'Gunakan jari telunjuk',
      'Buat gerakan bulat kecil di udara',
    ],
    tips: 'Pastikan gerakan jelas supaya soalan mudah difahami.',
  },
  {
    id: 'bagaimana',
    word: 'Bagaimana',
    description: 'Digunakan untuk bertanya cara atau keadaan',
    videoUrl: '/videos/bagaimana.mp4',
    instructions: [
      'Kedua-dua tangan di hadapan',
      'Gerakkan tangan secara bergantian',
    ],
    tips: 'Ekspresi muka membantu menunjukkan maksud soalan.',
  },
  {
    id: 'bila',
    word: 'Bila',
    description: 'Digunakan untuk bertanya tentang masa',
    videoUrl: '/videos/bila.mp4',
    instructions: [
      'Tunjuk ke arah pergelangan tangan',
      'Buat gerakan kecil ke hadapan',
    ],
    tips: 'Selalu digunakan bersama konteks masa atau jam.',
  },
  {
    id: 'mana',
    word: 'Mana',
    description: 'Digunakan untuk bertanya lokasi atau pilihan',
    videoUrl: '/videos/mana.mp4',
    instructions: [
      'Gerakkan tangan ke kiri dan kanan',
      'Tapak tangan menghadap ke atas',
    ],
    tips: 'Gerakan ini melambangkan mencari atau memilih.',
  },
  {
    id: 'jumpa',
    word: 'Jumpa',
    description: 'Digunakan ketika bertemu seseorang',
    videoUrl: '/videos/jumpa.mp4',
    instructions: [
      'Gunakan kedua-dua jari telunjuk',
      'Gerakkan jari sehingga bertemu',
    ],
    tips: 'Isyarat ini juga boleh digunakan untuk maksud “bertemu”.',
  },
  {
    id: 'tanya',
    word: 'Tanya',
    description: 'Menunjukkan perbuatan bertanya',
    videoUrl: '/videos/tanya.mp4',
    instructions: [
      'Buat isyarat bertanya',
      'Arahkan tangan ke hadapan',
    ],
    tips: 'Selalu digabungkan dengan soalan seperti “apa” atau “siapa”.',
  },
  {
    id: 'mohon',
    word: 'Mohon',
    description: 'Digunakan untuk meminta secara sopan',
    videoUrl: '/videos/mohon.mp4',
    instructions: [
      'Letakkan tangan di hadapan dada',
      'Gerakkan tangan ke hadapan perlahan',
    ],
    tips: 'Gunakan ekspresi muka yang lembut untuk menunjukkan kesopanan.',
  },
  {
    id: 'tolong',
    word: 'Tolong',
    description: 'Meminta bantuan',
    videoUrl: '/videos/tolong.mp4',
    instructions: [
      'Letakkan satu tangan di hadapan',
      'Gerakkan tangan ke arah orang lain',
    ],
    tips: 'Isyarat ini sangat biasa dan penting dalam perbualan harian.',
  },
],
  'Perbuatan Harian': [
  {
    id: 'ada',
    word: 'Ada',
    description: 'Menunjukkan kewujudan atau kehadiran sesuatu',
    videoUrl: '/videos/ada.mp4',
    instructions: [
      'Tunjukkan tapak tangan terbuka',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Digunakan untuk menyatakan sesuatu wujud atau tersedia.',
  },
  {
    id: 'ambil',
    word: 'Ambil',
    description: 'Mengambil atau menerima sesuatu',
    videoUrl: '/videos/ambil.mp4',
    instructions: [
      'Bentuk tangan seolah memegang objek',
      'Gerakkan tangan ke arah badan',
    ],
    tips: 'Digunakan untuk tindakan mengambil objek atau barang.',
  },
  {
    id: 'bawa',
    word: 'Bawa',
    description: 'Membawa sesuatu ke suatu tempat',
    videoUrl: '/videos/bawa.mp4',
    instructions: [
      'Bentuk tangan seperti memegang barang',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Isyarat ini boleh digabungkan dengan lokasi destinasi.',
  },
  {
    id: 'buat',
    word: 'Buat',
    description: 'Melakukan sesuatu perbuatan',
    videoUrl: '/videos/buat.mp4',
    instructions: [
      'Buat gerakan tangan seperti melakukan aktiviti',
      'Gerakkan tangan secara perlahan',
    ],
    tips: 'Digunakan untuk merujuk kepada sebarang tindakan.',
  },
  {
    id: 'pergi',
    word: 'Pergi',
    description: 'Bergerak atau meninggalkan tempat',
    videoUrl: '/videos/pergi.mp4',
    instructions: [
      'Gerakkan tangan ke hadapan',
      'Tunjukkan arah pergerakan',
    ],
    tips: 'Boleh digabungkan dengan lokasi untuk konteks lebih jelas.',
  },
  {
    id: 'sampai',
    word: 'Sampai',
    description: 'Menunjukkan tiba di sesuatu tempat',
    videoUrl: '/videos/sampai.mp4',
    instructions: [
      'Angkat tangan ke hadapan',
      'Buat gerakan berhenti seolah sampai di destinasi',
    ],
    tips: 'Sering digunakan selepas isyarat "pergi".',
  },
  {
    id: 'makan',
    word: 'Makan',
    description: 'Tindakan memakan makanan',
    videoUrl: '/videos/makan.mp4',
    instructions: [
      'Buat gerakan tangan seolah memegang sudu',
      'Bawa ke mulut',
    ],
    tips: 'Isyarat ini mudah difahami untuk konteks makanan harian.',
  },
  {
    id: 'minum',
    word: 'Minum',
    description: 'Tindakan meminum sesuatu',
    videoUrl: '/videos/minum.mp4',
    instructions: [
      'Bentuk tangan seperti memegang cawan',
      'Gerakkan ke mulut',
    ],
    tips: 'Digunakan untuk menyatakan minum air atau minuman lain.',
  },
  {
    id: 'tidur',
    word: 'Tidur',
    description: 'Menunjukkan waktu tidur atau rehat',
    videoUrl: '/videos/tidur.mp4',
    instructions: [
      'Letakkan kepala di atas kedua tangan',
      'Tutup mata atau tunjuk gerakan tidur',
    ],
    tips: 'Boleh digabungkan dengan masa tidur untuk konteks lebih jelas.',
  },
  {
    id: 'main',
    word: 'Main',
    description: 'Melakukan aktiviti bermain',
    videoUrl: '/videos/main.mp4',
    instructions: [
      'Buat gerakan tangan seolah memegang permainan',
      'Gerakkan tangan seperti bermain',
    ],
    tips: 'Boleh digunakan untuk kanak-kanak atau aktiviti santai.',
  },
],
  'Keluarga': [
  {
    id: 'keluarga',
    word: 'Keluarga',
    description: 'Merujuk kepada ahli keluarga secara umum',
    videoUrl: '/videos/keluarga.mp4',
    instructions: [
      'Gunakan kedua-dua tangan di hadapan dada',
      'Buat gerakan bulat kecil',
    ],
    tips: 'Isyarat ini melambangkan hubungan rapat dalam satu kumpulan.',
  },
  {
    id: 'ayah',
    word: 'Ayah / Bapa',
    description: 'Merujuk kepada bapa',
    videoUrl: '/videos/ayah.mp4',
    instructions: [
      'Gunakan ibu jari',
      'Sentuh bahagian dahi',
    ],
    tips: 'Isyarat ini biasanya digunakan untuk figura lelaki dalam keluarga.',
  },
  {
    id: 'emak',
    word: 'Emak',
    description: 'Merujuk kepada ibu',
    videoUrl: '/videos/emak.mp4',
    instructions: [
      'Gunakan ibu jari',
      'Sentuh bahagian dagu',
    ],
    tips: 'Digunakan untuk figura wanita dalam keluarga.',
  },
  {
    id: 'abang',
    word: 'Abang',
    description: 'Saudara lelaki yang lebih tua',
    videoUrl: '/videos/abang.mp4',
    instructions: [
      'Gunakan jari telunjuk',
      'Gerakkan ke atas sedikit',
    ],
    tips: 'Gerakan ke atas melambangkan lebih tua.',
  },
  {
    id: 'kakak',
    word: 'Kakak',
    description: 'Saudara perempuan yang lebih tua',
    videoUrl: '/videos/kakak.mp4',
    instructions: [
      'Gunakan jari telunjuk',
      'Gerakkan ke atas dengan lembut',
    ],
    tips: 'Pastikan ekspresi muka neutral dan jelas.',
  },
  {
    id: 'anak lelaki',
    word: 'Anak Lelaki',
    description: 'Merujuk kepada anak lelaki',
    videoUrl: '/videos/anak lelaki.mp4',
    instructions: [
      'Isyaratkan "anak"',
      'Ikuti dengan isyarat "lelaki"',
    ],
    tips: 'Isyarat gabungan untuk maksud yang lebih tepat.',
  },
  {
    id: 'anak perempuan',
    word: 'Anak Perempuan',
    description: 'Merujuk kepada anak perempuan',
    videoUrl: '/videos/anak perempuan.mp4',
    instructions: [
      'Isyaratkan "anak"',
      'Ikuti dengan isyarat "perempuan"',
    ],
    tips: 'Pastikan setiap bahagian isyarat dibuat dengan jelas.',
  },
  {
    id: 'bapa saudara',
    word: 'Bapa Saudara',
    description: 'Abang atau adik kepada bapa',
    videoUrl: '/videos/bapa saudara.mp4',
    instructions: [
      'Isyaratkan "bapa"',
      'Ikuti dengan isyarat "saudara"',
    ],
    tips: 'Digunakan untuk kedua-dua bapa saudara sebelah ibu atau bapa.',
  },
  {
    id: 'emak saudara',
    word: 'Emak Saudara',
    description: 'Kakak atau adik kepada ibu',
    videoUrl: '/videos/emak saudara.mp4',
    instructions: [
      'Isyaratkan "emak"',
      'Ikuti dengan isyarat "saudara"',
    ],
    tips: 'Gunakan gerakan yang lembut dan jelas.',
  },
  {
    id: 'saudara',
    word: 'Saudara',
    description: 'Merujuk kepada ahli keluarga atau kerabat',
    videoUrl: '/videos/saudara.mp4',
    instructions: [
      'Gunakan kedua-dua tangan',
      'Gerakkan ke arah satu sama lain',
    ],
    tips: 'Isyarat ini menunjukkan hubungan kekeluargaan.',
  },
  {
    id: 'lelaki',
    word: 'Lelaki',
    description: 'Merujuk kepada jantina lelaki',
    videoUrl: '/videos/lelaki.mp4',
    instructions: [
      'Gunakan isyarat lelaki',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Sering digabungkan dengan perkataan lain.',
  },
  {
    id: 'perempuan',
    word: 'Perempuan',
    description: 'Merujuk kepada jantina perempuan',
    videoUrl: '/videos/perempuan.mp4',
    instructions: [
      'Gunakan isyarat perempuan',
      'Gerakkan tangan secara lembut',
    ],
    tips: 'Digunakan secara meluas dalam perbualan.',
  },
],
  'Makanan & Minuman': [
  {
    id: 'nasi',
    word: 'Nasi',
    description: 'Makanan ruji masyarakat Malaysia',
    videoUrl: '/videos/nasi.mp4',
    instructions: [
      'Bentuk tangan seperti mencubit kecil',
      'Gerakkan tangan ke arah mulut',
    ],
    tips: 'Isyarat ini sering digunakan bersama makanan lain.',
  },
  {
    id: 'nasi lemak',
    word: 'Nasi Lemak',
    description: 'Hidangan tradisional Malaysia',
    videoUrl: '/videos/nasi lemak.mp4',
    instructions: [
      'Isyaratkan "nasi"',
      'Ikuti dengan isyarat "lemak"',
    ],
    tips: 'Gabungan dua isyarat untuk maksud yang lebih spesifik.',
  },
  {
    id: 'teh tarik',
    word: 'Teh Tarik',
    description: 'Minuman teh susu yang popular',
    videoUrl: '/videos/teh tarik.mp4',
    instructions: [
      'Bentuk tangan seperti memegang cawan',
      'Lakukan gerakan menuang dan menarik',
    ],
    tips: 'Gerakan tarik melambangkan cara penyediaan teh tarik.',
  },
  {
    id: 'lemak',
    word: 'Lemak',
    description: 'Rasa makanan yang berkrim atau berminyak',
    videoUrl: '/videos/lemak.mp4',
    instructions: [
      'Sentuh pipi dengan jari',
      'Buat gerakan bulat kecil',
    ],
    tips: 'Ekspresi muka membantu menunjukkan rasa makanan.',
  },
],
  'Emosi & Keadaan Diri': [
  {
    id: 'baik',
    word: 'Baik',
    description: 'Menunjukkan keadaan atau perasaan yang baik',
    videoUrl: '/videos/baik.mp4',
    instructions: [
      'Angkat tangan kanan ke paras dada',
      'Gerakkan tangan ke hadapan secara lembut',
    ],
    tips: 'Digunakan untuk menyatakan keadaan diri atau orang lain dalam keadaan positif.',
  },
  {
    id: 'jahat',
    word: 'Jahat',
    description: 'Menunjukkan perbuatan atau sikap negatif',
    videoUrl: '/videos/jahat.mp4',
    instructions: [
      'Buat gerakan tangan dengan sedikit membengkok',
      'Tunjukkan ekspresi muka yang serius',
    ],
    tips: 'Isyarat ini digunakan untuk menegaskan tindakan atau sifat yang buruk.',
  },
  {
    id: 'marah',
    word: 'Marah',
    description: 'Menunjukkan perasaan marah atau kecewa',
    videoUrl: '/videos/marah.mp4',
    instructions: [
      'Tutup tangan menjadi penumbuk ringan',
      'Angkat ke paras dada dan hentakkan perlahan',
    ],
    tips: 'Ekspresi muka penting untuk menyampaikan emosi marah dengan jelas.',
  },
  {
    id: 'suka',
    word: 'Suka',
    description: 'Menunjukkan perasaan suka atau gembira',
    videoUrl: '/videos/suka.mp4',
    instructions: [
      'Angkat kedua-dua tangan sedikit ke hadapan',
      'Buat gerakan melambai atau menunjuk ke dada',
    ],
    tips: 'Digunakan untuk menyatakan kesukaan terhadap sesuatu atau seseorang.',
  },
  {
    id: 'kesakitan',
    word: 'Kesakitan',
    description: 'Menunjukkan rasa sakit atau tidak selesa',
    videoUrl: '/videos/kesakitan.mp4',
    instructions: [
      'Letakkan tangan di bahagian yang sakit',
      'Buat gerakan menekan ringan',
    ],
    tips: 'Gabungkan dengan ekspresi muka untuk menunjukkan lokasi dan intensiti sakit.',
  },
  {
    id: 'masalah',
    word: 'Masalah',
    description: 'Menunjukkan ada masalah atau kesukaran',
    videoUrl: '/videos/masalah.mp4',
    instructions: [
      'Letakkan tangan di hadapan dada',
      'Buat gerakan bulat kecil dengan tangan',
    ],
    tips: 'Isyarat ini boleh digunakan untuk menunjukkan isu yang sedang dihadapi.',
  },
  {
    id: 'pandai',
    word: 'Pandai',
    description: 'Menunjukkan kebolehan atau kepintaran',
    videoUrl: '/videos/pandai.mp4',
    instructions: [
      'Sentuh dahi dengan jari telunjuk',
      'Gerakkan tangan ke hadapan secara ringan',
    ],
    tips: 'Digunakan untuk menyatakan seseorang mempunyai kepintaran atau kemahiran.',
  },
  {
    id: 'pandai 2',
    word: 'Pandai 2',
    description: 'Variasi isyarat untuk "pandai"',
    videoUrl: '/videos/pandai 2.mp4',
    instructions: [
      'Buat isyarat seperti "pandai"',
      'Tambah gerakan sedikit menekankan kepintaran',
    ],
    tips: 'Boleh digunakan sebagai penekanan atau variasi dalam perbualan.',
  },
],
  'Pengangkutan, Objek & Keselamatan': [
  {
    id: 'bas',
    word: 'Bas',
    description: 'Kenderaan bas',
    videoUrl: '/videos/bas.mp4',
    instructions: [
      'Buat isyarat bentuk bas',
      'Gerakkan tangan ke hadapan seperti pergerakan bas',
    ],
    tips: 'Digunakan ketika bercakap tentang pengangkutan awam.',
  },
  {
    id: 'kereta',
    word: 'Kereta',
    description: 'Kenderaan kereta',
    videoUrl: '/videos/kereta.mp4',
    instructions: [
      'Buat gerakan tangan seperti memegang stereng',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Isyarat ini jelas untuk menunjukkan pergerakan kenderaan.',
  },
  {
    id: 'teksi',
    word: 'Teksi',
    description: 'Kenderaan teksi',
    videoUrl: '/videos/teksi.mp4',
    instructions: [
      'Buat gerakan seperti memanggil teksi',
      'Angkat tangan ke atas',
    ],
    tips: 'Digunakan untuk menunjukkan teksi atau mengajak menaiki teksi.',
  },
  {
    id: 'polis',
    word: 'Polis',
    description: 'Pegawai polis',
    videoUrl: '/videos/polis.mp4',
    instructions: [
      'Buat isyarat lencana polis atau tapak tangan di dada',
      'Gerakkan tangan perlahan',
    ],
    tips: 'Digunakan untuk merujuk pegawai keselamatan.',
  },
  {
    id: 'bomba',
    word: 'Bomba',
    description: 'Pegawai bomba atau kebakaran',
    videoUrl: '/videos/bomba.mp4',
    instructions: [
      'Buat isyarat seperti memegang hos air',
      'Gerakkan tangan ke depan',
    ],
    tips: 'Digunakan dalam konteks keselamatan kebakaran.',
  },
  {
    id: 'pen',
    word: 'Pen',
    description: 'Alat tulis',
    videoUrl: '/videos/pen.mp4',
    instructions: [
      'Buat gerakan menulis dengan tangan',
      'Tunjukkan arah menulis di udara',
    ],
    tips: 'Digunakan untuk menunjukkan aktiviti menulis.',
  },
  {
    id: 'pensil',
    word: 'Pensil',
    description: 'Alat tulis pensil',
    videoUrl: '/videos/pensil.mp4',
    instructions: [
      'Buat gerakan seperti menulis dengan pensil',
      'Tunjukkan gerakan menulis di udara',
    ],
    tips: 'Boleh digabungkan dengan perkataan lain seperti "tulis".',
  },
  {
    id: 'payung',
    word: 'Payung',
    description: 'Alat untuk melindungi daripada hujan',
    videoUrl: '/videos/payung.mp4',
    instructions: [
      'Buat gerakan memegang payung',
      'Gerakkan tangan ke atas',
    ],
    tips: 'Digunakan untuk menyatakan alat perlindungan hujan.',
  },
  {
    id: 'bola',
    word: 'Bola',
    description: 'Alat permainan berbentuk bulat',
    videoUrl: '/videos/bola.mp4',
    instructions: [
      'Bentuk tangan seolah memegang bola',
      'Buat gerakan bulat kecil di udara',
    ],
    tips: 'Digunakan untuk aktiviti sukan atau permainan.',
  },
  {
    id: 'pukul',
    word: 'Pukul',
    description: 'Tindakan memukul atau menampar',
    videoUrl: '/videos/pukul.mp4',
    instructions: [
      'Buat gerakan tangan menumbuk ringan di udara',
      'Tunjukkan ekspresi serius',
    ],
    tips: 'Digunakan untuk menunjukkan perbuatan negatif atau amaran.',
  },
  {
    id: 'curi',
    word: 'Curi',
    description: 'Menunjukkan perbuatan mencuri',
    videoUrl: '/videos/curi.mp4',
    instructions: [
      'Buat gerakan tangan seolah mengambil sesuatu secara rahsia',
      'Gerakkan tangan perlahan ke arah badan',
    ],
    tips: 'Digunakan untuk memberi contoh perbuatan yang salah.',
  },
  {
    id: 'kacau',
    word: 'Kacau',
    description: 'Menunjukkan perbuatan mengganggu',
    videoUrl: '/videos/kacau.mp4',
    instructions: [
      'Buat gerakan tangan seperti mencampur atau mengacau',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Digunakan untuk menunjukkan gangguan atau tindakan negatif.',
  },
],
  'Tempat & Arah': [
  {
    id: 'sekolah',
    word: 'Sekolah',
    description: 'Merujuk kepada bangunan atau tempat sekolah',
    videoUrl: '/videos/sekolah.mp4',
    instructions: [
      'Buat gerakan tangan menunjukkan bangunan',
      'Gerakkan tangan ke atas sedikit',
    ],
    tips: 'Boleh digabungkan dengan lokasi lain dalam perbualan.',
  },
  {
    id: 'tandas',
    word: 'Tandas',
    description: 'Menunjukkan lokasi tandas',
    videoUrl: '/videos/tandas.mp4',
    instructions: [
      'Tunjuk arah lokasi tandas',
      'Buat gerakan seperti pintu terbuka',
    ],
    tips: 'Digunakan untuk memberi arahan lokasi.',
  },
  {
    id: 'dari',
    word: 'Dari',
    description: 'Menunjukkan asal atau permulaan',
    videoUrl: '/videos/dari.mp4',
    instructions: [
      'Tunjuk arah asal',
      'Gerakkan tangan ke hadapan',
    ],
    tips: 'Boleh digabungkan dengan isyarat "ke" untuk perjalanan.',
  },
  {
    id: 'arah',
    word: 'Arah',
    description: 'Menunjukkan hala atau petunjuk',
    videoUrl: '/videos/arah.mp4',
    instructions: [
      'Tunjuk jari ke arah yang dimaksudkan',
      'Gerakkan sedikit ke hadapan',
    ],
    tips: 'Digunakan untuk memberi arahan atau petunjuk.',
  },
  {
    id: 'boleh',
    word: 'Boleh',
    description: 'Menunjukkan kebenaran atau izin',
    videoUrl: '/videos/boleh.mp4',
    instructions: [
      'Angkat ibu jari ke atas',
      'Tunjukkan senyuman kecil',
    ],
    tips: 'Sering digunakan dalam arahan atau persetujuan.',
  },
  {
    id: 'jangan',
    word: 'Jangan',
    description: 'Menunjukkan larangan',
    videoUrl: '/videos/jangan.mp4',
    instructions: [
      'Angkat tangan seperti menahan',
      'Gerakkan tangan perlahan ke hadapan',
    ],
    tips: 'Digunakan untuk memberi amaran atau menunjukkan larangan.',
  },
],
  'Masa & Cuaca': [
  {
    id: 'hari',
    word: 'Hari',
    description: 'Menunjukkan hari atau masa siang',
    videoUrl: '/videos/hari.mp4',
    instructions: [
      'Buat gerakan tangan melengkung seperti matahari',
      'Angkat tangan ke atas sedikit',
    ],
    tips: 'Digunakan untuk menunjukkan waktu atau hari tertentu.',
  },
  {
    id: 'masa',
    word: 'Masa',
    description: 'Merujuk kepada masa atau waktu',
    videoUrl: '/videos/masa.mp4',
    instructions: [
      'Tunjuk pergelangan tangan seperti jam',
      'Buat gerakan bulat kecil',
    ],
    tips: 'Gabungkan dengan isyarat jam atau hari untuk konteks jelas.',
  },
  {
    id: 'jam',
    word: 'Jam',
    description: 'Menunjukkan jam atau waktu tertentu',
    videoUrl: '/videos/jam.mp4',
    instructions: [
      'Tunjuk pergelangan tangan atau buat isyarat jam',
      'Gerakkan tangan perlahan',
    ],
    tips: 'Boleh digunakan bersama nombor untuk nyatakan masa spesifik.',
  },
  {
    id: 'hujan',
    word: 'Hujan',
    description: 'Menunjukkan cuaca hujan',
    videoUrl: '/videos/hujan.mp4',
    instructions: [
      'Buat gerakan jari seperti titik hujan jatuh',
      'Gerakkan tangan ke bawah berulang kali',
    ],
    tips: 'Gerakan jari menandakan titisan hujan.',
  },
  {
    id: 'ribut',
    word: 'Ribut',
    description: 'Menunjukkan cuaca ribut atau angin kencang',
    videoUrl: '/videos/ribut.mp4',
    instructions: [
      'Gerakkan tangan seperti angin bertiup',
      'Tambahkan gerakan cepat untuk menekankan ribut',
    ],
    tips: 'Boleh digabungkan dengan hujan untuk cuaca ekstrem.',
  },
  {
    id: 'panas',
    word: 'Panas',
    description: 'Menunjukkan cuaca panas atau suhu tinggi',
    videoUrl: '/videos/panas.mp4',
    instructions: [
      'Letakkan tangan di dahi',
      'Gerakkan tangan perlahan ke hadapan',
    ],
    tips: 'Ekspresi muka membantu menunjukkan rasa panas.',
  },
  {
    id: 'sejuk',
    word: 'Sejuk',
    description: 'Menunjukkan cuaca sejuk atau suhu rendah',
    videoUrl: '/videos/sejuk.mp4',
    instructions: [
      'Peluk badan sendiri',
      'Goyangkan tangan perlahan menunjukkan kesejukan',
    ],
    tips: 'Isyarat ini boleh digunakan juga untuk menunjukkan rasa sejuk badan.',
  },
],

};