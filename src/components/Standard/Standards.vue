<template>
  <div class="container">
    <div class="row pt-5 pb-5">
      <!-- Кнопка "Назад", возвращающая пользователя обратно на главную страницу !-->
      <div class="col" id="returnButton">
        <button
          type="button"
          class="btn btn-primary btn-md"
          @click="$router.push('/')"
          id="toHome"
        >
          Назад
        </button>
      </div>
      <!-- Кнопка "Создать компетентностную модель !-->
      <div class="col" id="toCompetenceModelButton">
        <button
          type="button"
          class="btn btn-primary btn-md"
          @click="$router.push('/')"
          id="toHome"
        >
          Создать компетентностную модель
        </button>
      </div>

      <!-- Таблица с профстандартами !-->
      <StandardsTable :standardList="standards"></StandardsTable>
    </div>
  </div>
</template>

<script>
import MainDataService from "@/services/MainDataService";
//import StandardsHeader from "@/components/Standard/StandardsHeader";
import StandardsTable from "@/components/Standard/StandardsTable";

export default {
  name: "Standards",
  components: { StandardsTable },
  props: {
    educationLevel: String,
    specializationCode: String,
    subjMajor: String,
    resourceToDownload: String,
    tags: Array,
  },

  data() {
    return {
      // Накопленные ошибки работы приложения
      errors: [],

      // Список подобранных простандартов
      standards: [],
    };
  },
  methods: {
    getStandards() {
      let searchData = {
        educationLevel: this.educationLevel,
        specializationCode: this.specializationCode,
        subjMajor: this.subjMajor,
        resourceToDownload: this.resourceToDownload,
        keywords: this.tags.map((obj) => obj.text).join(","),
      };
      console.log(searchData);

      /*const searchStandardsRequest = async () => {
        try {
          const resp = await MainDataService.searchStandards(searchData);
          this.standards = resp.data;
        } catch (err) {
          console.error(err);
        }
      }*/
      MainDataService.searchStandards(searchData)
        .then((response) => {
          this.standards = response.data;
        })
        .catch((e) => {
          if (e.request) {
            console.log(e.request);
          }
          if (e.response) {
            console.log(e.response);
          }
        });

      console.log(this.standards);
    },
  },
  mounted: function () {
    this.getStandards();
  },
};
</script>

<style scoped>
#editButton {
  text-align: right;
}

#toCompetenceModelButton {
  text-align: right;
}

.btn-md {
  font-size: 14px;
}
</style>