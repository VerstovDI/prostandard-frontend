<template>
  <div class="q-pa-md" id="standardsTable">
    <q-table
      title="Подобранные стандарты"
      :rows="rows"
      :columns="columns"
      row-key="name"
      no-data-label="По заданным критерием стандартов не подобрано"
      no-results-label="По заданным фильтрам стандартов не найдено"
      rows-per-page-label="Стандартов на страницу"
    >
      <!-- <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Well this is sad... {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template> -->

      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Экспорт в csv"
          no-caps
          @click="exportTable"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile, useQuasar } from "quasar";

const columns = [
  {
    name: "regNumber",
    required: true,
    label: "Рег. #",
    align: "left",
    field: "regNumber",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "code",
    align: "left",
    label: "Код",
    field: "code",
    sortable: true,
    sort: (a, b) => a - b,
  },
  {
    name: "standardName",
    align: "left",
    label: "Название",
    field: "standardName",
    sortable: true,
  },
  {
    name: "activityType",
    align: "left",
    label: "Проф. деятельность",
    field: "activityType",
    sortable: true,
  },
  {
    name: "activityPurpose",
    align: "left",
    label: "Цель проф. деятельности",
    field: "activityPurpose",
    sortable: true,
  },
];

const rows = [
  {
    regNumber: "1",
    code: "01.001",
    standardName:
      "Педагог (педагогическая деятельность в сфере дошкольного, начального общего, основного общего, среднего общего образования) (воспитатель, учитель)",
    activityType:
      "Дошкольное образование      Начальное общее образование       Основное общее образование        Среднее общее образование",
    activityPurpose:
      "Оказание образовательных услуг по основным общеобразовательным программам образовательными организациями (организациями, осуществляющими обучение)",
  },
  {
    regNumber: "469",
    code: "12.002",
    standardName: "Специалист по приему и обработке экстренных вызовов",
    activityType:
      "Прием и обработка экстренных вызовов (сообщений о происшествиях), поступающих в центр обработки экстренных вызовов",
    activityPurpose:
      "Обеспечение информирования экстренных оперативных (далее - ЭОС) и аварийно-восстановительных служб (далее - АВС), служб жизнеобеспечения населения и единых дежурно-диспетчерских служб (далее - ЕДДС) о происшествиях с целью предотвращения и устранения угрозы жизни, здоровью и имуществу граждан, а также правопорядку",
  },
  {
    regNumber: "318",
    code: "23.005",
    standardName: "Машинист рубительной машины в лесопромышленном комплексе",
    activityType: "Управление работой рубительной машины",
    activityPurpose:
      "Ведение процесса изготовления щепы для производства целлюлозы и древесной массы",
  },
  {
    regNumber: "727",
    code: "23.049",
    standardName:
      "Оператор установок производства древесной массы на дефибрерах",
    activityType:
      "Управление работой оборудования для производства древесной массы на дефибрерных установках",
    activityPurpose:
      "Ведение процесса изготовления древесной массы из балансовой древесины дефибрерным способом для последующего ее использования в композиции бумаги и картона",
  },
  {
    regNumber: "35",
    code: "15.001",
    standardName:
      "Специалист по техническому обеспечению рыболовства и рыбоводства",
    activityType:
      "Техническое обеспечение добычи (вылова) водных биологических ресурсов и аквакультуры",
    activityPurpose:
      "Проектирование, производство, испытания, техническое обслуживание и ремонт орудий добычи (вылова) водных биологических ресурсов и технических средств аквакультуры",
  },
  {
    regNumber: "1239",
    code: "02.045",
    standardName: "Врач - детский эндокринолог",
    activityType: "Врачебная практика в области детской эндокринологии",
    activityPurpose:
      "Профилактика, диагностика, лечение заболеваний и (или) состояний эндокринной системы у детей, медицинская реабилитация детей",
  },
];

// Функционал экспорта в csv
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "StandardsTable",
  props: {
    standardList: Array,
  },

  // Настройка и конфигурация "Умной таблицы"
  setup() {
    const $q = useQuasar();

    return {
      columns,
      rows,

      exportTable() {
        // Переводим в формат .csv
        const content = [columns.map((col) => wrapCsvValue(col.label))]
          .concat(
            rows.map((row) =>
              columns
                .map((col) =>
                  wrapCsvValue(
                    typeof col.field === "function"
                      ? col.field(row)
                      : row[col.field === void 0 ? col.name : col.field],
                    col.format
                  )
                )
                .join(",")
            )
          )
          .join("\r\n");

        const status = exportFile("table-export.csv", content, "text/csv");

        if (status !== true) {
          $q.notify({
            message: "Browser denied file download...",
            color: "negative",
            icon: "warning",
          });
        }
      },
    };
  },
  data() {
    return {
      // columns: [
      //   { prop: "regNumber", name: "s" },
      //   { prop: "profstandardCode", name: "b" },
      //   { prop: "profstandardName", name: "c" },
      // ],
      //rows: [{ regNumber: "1", profstandardCode: "t", profstandardName: "23" }],

      standards: [],
    };
  },
};
</script>

<style scoped>
</style>