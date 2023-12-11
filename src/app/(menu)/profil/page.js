import Image from 'next/image'

export default function Profile() {
  return (
    <>
      <title>Puslitbang BMKG</title>
      <div className=" flex flex-col">
        <h1 className="mt-10 text-center font-bold text-2xl mb-2">
          Profil Divisi Puslitbang BMKG
        </h1>
      </div>
      <div className="flex-col">
        <div className="mt-10 space-y-2 sm:text-left">
          <h1 className=" font-bold text-2xl mb-2">
            Bagan Struktur Puslitbang BMKG
          </h1>
          <hr className="w-18 border-2 border-white my-auto" />
        </div>
      </div>
      <div className="flex px-20">
        <Image
          className="mx-auto mt-10"
          src="/images/bagan.png"
          width={1000}
          height={900}
          alt="Picture of the author"
        />
      </div>
      <div className="flex-col mt-10">
        <div className="text-justif text-center space-y-2 sm:text-left">
          <h1 className=" text-center font-bold text-2xl mb-2">
            Struktur Organisasi
          </h1>
          <ul className="list-disc">
            <li className="mt-5">
              Bidang Penelitian dan Pengembangan Meteorologi
            </li>
            <li>Bidang Penelitian dan Pengembangan Geofisika</li>
            <li>Bidang Penelitian dan Pengembangan Klimatologi</li>
            <li>Subbagian Tata Usaha</li>
            <li>Kelompok Jabatan Fungsional</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="text-center space-y-2 sm:text-left">
          <h1 className="mt-10 text-center font-bold text-2xl mb-2">Profil</h1>
          <p className="mt-10 text-justify">
            PUSAT PENELITIAN DAN PENGEMBANGAN BADAN METEOROLOGI KLIMATOLOGI DAN
            GEOFISIKA. Dasar HukumBerdasarkan Peraturan Kepala Badan Meteorologi
            Klimatologi dan Geofisika Nomor: KEP.03 Tahun 2009 tentang
            Organisasi dan Tata Kerja Badan Meteorologi Klimatologi dan
            Geofisika Pusat Penelitian dan Pengembangan selanjutnya disebut
            Puslitbang adalah unsur penunjang tugas dan fungsi BMKG di bidang
            penelitian dan pengembangan yang berada di bawah dan bertanggung
            jawab kepada Kepala melalui Sekretaris Utama. Dalam menjalankan
            tugas dan fungsinya, Puslitbang secara teknis fungsional
            dikoordinasikan oleh Deputi yang berkesesuaian, dan secara
            administratif dikoordinasikan oleh Sekretaris Utama. Puslitbang
            dipimpin oleh Kepala Pusat.
          </p>
        </div>
      </div>
      <div>
        <div className="mt-10 text-center space-y-2 sm:text-left">
          <h1 className=" text-center font-bold text-2xl mb-2">
            Tugas Pokok Puslitbang
          </h1>
          <p className="text-justify">
            Puslitbang mempunyai tugas melaksanakan penelitian, pengkajian dan
            pengembangan, pembinaan dan pengendalian pelaksanaan pengkajian,
            penelitian dan pengembangan, koordinasi dan kerjasama serta
            diseminasi hasil penelitian, pengkajian, dan pengembangan di bidang
            meteorologi, klimatologi, kualitas udara, dan geofisika.
          </p>
        </div>
      </div>
      <div className="flex-col mt-10">
        <div className="text-center space-y-2 sm:text-left">
          <h1 className=" text-center font-bold text-2xl mb-2">Tujuan</h1>
          <p className="text-justify">
            Meningkatkan hasil penelitian ilmiah, pengembangan dan kajian metoda
            dan prosedur operasional di bidang MKKUG yang dapat digunakan untuk
            meningkatkan kualitas informasi MKKUG dan atau dipublikasikan secara
            nasional maupun internasional.
          </p>
        </div>
      </div>
      <div className="flex-col mt-10">
        <div className="text-justif text-center space-y-2 sm:text-left">
          <h1 className=" text-center font-bold text-2xl mb-2">
            Fungsi Puslitbang
          </h1>
          <ul className="list-disc">
            <li className="mt-5">
              Penyusunan rencana dan program penelitian, pengkajian
              danpengembangan di bidang meteorologi, klimatologi, kualitas udara
              dan geofisika
            </li>
            <li>
              Pembinaan dan pengendalian pelaksanaan penelitian, pengkajian, dan
              pengembangan di bidang meteorologi, klimatologi, kualitas udara
              dan geofisika
            </li>
            <li>
              Koordinasi dan kerjasama penelitian, pengkajian, dan pengembangan
              di bidang meteorologi, klimatologi, kualitas udara dan geofisika
            </li>
            <li>
              Pelaksanaan penelitian, pengkajian dan pengembangan di bidang
              meteorologi, klimatologi, kualitas udara dan geofisika
            </li>
            <li>
              Pemberian pelayanan penelitian, pengkajian dan pengembangan dan
              informasi ilmiah di bidang meteorologi, klimatologi, kualitas
              udara dan geofisika
            </li>
            <li>
              Pelaksanaan evaluasi dan laporan kegiatan penelitian, pengkajian,
              dan pengembangan di bidang meteorologi, klimatologi, kualitas
              udara dan geofisika
            </li>
            <li>
              Pelaksanaan diseminasi hasil penelitian, pengkajian dan
              pengembangan di bidang meteorologi, klimatologi dan geofisika
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
