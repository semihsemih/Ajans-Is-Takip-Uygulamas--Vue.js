<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-layout
            row
            wrap
          >
            <v-flex
              xs12
              md6
            >
              <v-select
                outline
                label="İçerik Türleri"
                v-model="formData.category"
                :items="categoryList"
              />
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <v-autocomplete
                outline
                label="Konular"
                :items="categoryContents"
                item-text="title"
                item-value="title"
                v-model="formData.content"
              />
            </v-flex>
            <v-flex
              xs12
              md12
            >
              <v-textarea
                outline
                label="Açıklama"
                placeholder="Konuyla ilgili açıklama giriniz"
                v-model="formData.contentDescription"
                name="description"
                value=""
              />
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <DateField
                label="Başlangıç Tarihi"
                v-model="formData.startDate"
              />
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <DateField
                label="Bitiş Tarihi"
                v-model="formData.finishDate"
              />
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="formData.advBudget"
                label="Bütçe"
                outline
                append-icon="fa-try"
                type="number"
              />
            </v-flex>
            <v-flex
              xs12
              md6
            >
              <v-text-field
                v-model="formData.advPeriod"
                label="Reklam Süresi"
                type="number"
                suffix="Gün"
                outline
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('closeDialog')"
        >
          Vazgeç
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="$emit('saveData')"
        >
          Kaydet
        </v-btn>
      </v-spacer>
    </v-card-actions>
  </v-card>
</template>


<script>
import DateField from "./../../../components/field-types/DateField";
export default {
  name: "AppForm",
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      categoryList: [
        "Kurumsal",
        "Faydalı İçerik",
        "Video",
        "Fotoğraf",
        "Soru - Cevap"
      ],
      contentList: [
        { title: "Ödüller", category: "Kurumsal" },
        { title: "Referanslar", category: "Kurumsal" },
        { title: "Eğitmenler / Uzmanlar", category: "Kurumsal" },
        { title: "Şubeler / Bayiler / Ağlar", category: "Kurumsal" },
        { title: "Müşteriler", category: "Kurumsal" },
        { title: "Projeler", category: "Kurumsal" },
        { title: "Belgeler", category: "Kurumsal" },
        { title: "Sosyal Sorumluluk", category: "Kurumsal" },
        { title: "İş İlanları", category: "Kurumsal" },
        { title: "Basında Biz", category: "Kurumsal" },
        { title: "Seminer / Fuar / Toplantı", category: "Kurumsal" },
        { title: "Özel Gün Kutlamaları", category: "Kurumsal" },
        { title: "Tarihçe", category: "Kurumsal" },
        { title: "Bildiriler", category: "Kurumsal" },
        { title: "İdari Yapı", category: "Kurumsal" },
        { title: "Hizmet Standartları", category: "Kurumsal" },
        { title: "Kalite Politikası", category: "Kurumsal" },
        {
          title: "Ürünü Kullanırken Verilecek Pratik Bilgiler, Uzman Tavsiyesi",
          category: "Faydalı İçerik"
        },
        { title: "Karşılaşılan Sorunların Çözümü", category: "Faydalı İçerik" },
        {
          title: "Merak Uyandıracak İçerikler (Trend/Moda), E-kitap / bülten",
          category: "Faydalı İçerik"
        },
        { title: "Karşılaştırma Yapan İçerikler", category: "Faydalı İçerik" },
        { title: "Kullanım Kılavuzları", category: "Faydalı İçerik" },
        { title: "Teknik Dokümanlar", category: "Faydalı İçerik" },
        {
          title: "Faydalı Bilgiler/Yöntemler/Dikkat Edilecekler",
          category: "Faydalı İçerik"
        },
        {
          title: "Nasıl Yapılır? İçerikler (5N1K)",
          category: "Faydalı İçerik"
        },
        {
          title: "Medya İçerikleri (Dinamik Görselli)",
          category: "Faydalı İçerik"
        },
        {
          title: "İnfografikler (Bilginin Grafikle Verilmesi)",
          category: "Faydalı İçerik"
        },
        { title: "Ürün Tanıtım İçerikleri", category: "Faydalı İçerik" },
        { title: "Ürün / Hizmet İncelemeleri", category: "Faydalı İçerik" },
        { title: "Röportajlar", category: "Faydalı İçerik" },
        { title: "İstatistikler", category: "Faydalı İçerik" },
        { title: "E-kitap / E-Bülten / Kılavuz", category: "Faydalı İçerik" },
        { title: "Uzman Tavsiyesi", category: "Faydalı İçerik" },
        { title: "Eğlendirici İçerik", category: "Faydalı İçerik" },
        { title: "Liste İçerikleri", category: "Faydalı İçerik" },
        { title: "Ürün Videoları", category: "Video" },
        { title: "Hizmet Videoları", category: "Video" },
        { title: "Firma Tanıtım Videoları", category: "Video" },
        { title: "Uzman Videoları", category: "Video" },
        { title: "PR Videoları", category: "Video" },
        { title: "Eğlendirici Videolar", category: "Video" },
        { title: "Sokak Röportajları", category: "Video" },
        { title: "Kısa Belgesel Videoları", category: "Video" },
        { title: "Üretim Kademeleri Videoları", category: "Video" },
        { title: "SSS Videoları", category: "Video" },
        { title: "İndirim / Kampanya Videoları", category: "Video" },
        { title: "Ürün Karşılaştırma Videoları", category: "Video" },
        { title: "TV Programı Videoları", category: "Video" },
        { title: "Uygulama Videoları", category: "Video" },
        { title: "Teknoloji Videoları", category: "Video" },
        { title: "Nasıl Yapılır Videoları", category: "Video" },
        { title: "Dayanıklılık Videoları", category: "Video" },
        { title: "Kullanım Alanı Videoları", category: "Video" },
        { title: "Stok Fotoğraflar", category: "Fotoğraf" },
        { title: "Firma Tanıtım Fotoğrafları", category: "Fotoğraf" },
        { title: "Mekan Fotoğrafları", category: "Fotoğraf" },
        { title: "Ürün Tanıtım Fotoğrafları", category: "Fotoğraf" },
        { title: "Hizmet Tanıtım Fotoğrafları", category: "Fotoğraf" },
        { title: "Üretim Görselleri", category: "Fotoğraf" },
        {
          title: "Gerçek Hayattan Fotoğraflar Kullanmak",
          category: "Fotoğraf"
        },
        { title: "Anlık Fotoğraflar (Selfie)", category: "Fotoğraf" },
        { title: "Özel Gün Fotoğrafları", category: "Fotoğraf" },
        {
          title: "İlgi Çekici, Merak Uyandırıcı Fotoğraflar",
          category: "Fotoğraf"
        },
        {
          title: "Kurum İçi Çalışan, Müşteri, Ofis Fotoğrafları",
          category: "Fotoğraf"
        },
        { title: "Vektör (Çizim Fotoğrafları)", category: "Fotoğraf" },
        { title: "Komik / Eğlenceli Fotoğraf", category: "Fotoğraf" },
        { title: "Capsler", category: "Fotoğraf" },
        { title: "Reklam Bannerları", category: "Fotoğraf" },
        { title: "Broşür / Poster / Afiş", category: "Fotoğraf" },
        { title: "Dijital Tasarımlar", category: "Fotoğraf" },
        { title: "Etkinlik / Organizasyon Görselleri", category: "Fotoğraf" },
        { title: "Fuar / Seminer Görselleri", category: "Fotoğraf" },
        { title: "GIF", category: "Fotoğraf" },
        { title: "Illustrasyon", category: "Fotoğraf" },
        { title: "Karikatür", category: "Fotoğraf" },
        { title: "Ürün İle İlgili Sorular", category: "Soru - Cevap" },
        { title: "Hizmet İle İlgili Sorular", category: "Soru - Cevap" },
        { title: "Memnuniyet Sorusu", category: "Soru - Cevap" },
        { title: "Karşılaştırma Soruları", category: "Soru - Cevap" },
        { title: "Testler", category: "Soru - Cevap" },
        { title: "Çoktan Seçmeli Sorular", category: "Soru - Cevap" },
        { title: "Evet - Hayır Soruları", category: "Soru - Cevap" },
        { title: "Test / Oylama", category: "Soru - Cevap" },
        { title: "Uzmanına Sor", category: "Soru - Cevap" },
        { title: "Yarışma Soruları", category: "Soru - Cevap" },
        { title: "Ödüllü Sorular", category: "Soru - Cevap" },
        { title: "Değerlendirme Anketleri", category: "Soru - Cevap" },
        { title: "Derecelendirme Anketleri", category: "Soru - Cevap" },
        {
          title:
            "A/B Testleri (İki Ya Da Daha Fazla Görüntüye Verilen Tepkileri Ölçme)",
          category: "Soru - Cevap"
        }
      ]
    };
  },
  computed: {
    categoryContents() {
      return this.contentList.filter(
        item => item.category === this.formData.category
      );
    },
    formTitle() {
      return !this.formData.hasOwnProperty('id') ? "Yeni İçerik" : "İçeriği Düzenle";
    }
  },
  components: {
    DateField
  }
};
</script>

