<template>
  <div class="page">
    <h1 class="mb-5">Categorias de salud</h1>
    <div class="categories-grid">
      <category
        v-for="category in categories"
        :data="category"
        :key="category.id"
        :userId="userId"
        :studyId="studyId"
        :icon="category.icon"
      />
    </div>
  </div>
</template>
<script>
import category from "./category";
export default {
  name: "categories",
  components: {
    category,
  },
  props: {
    userId: {
      type: String,
      required: true,
    },
    studyId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      categories: [
        {
          name: "actividad",
          icon: require("@/assets/icons/Flame.png"),
          path: "userActivity",
        },
        { name: "Audicion", icon: require("@/assets/icons/Flame.png") },
        { name: "Conciencia Plena", icon: require("@/assets/icons/Flame.png") },
        {
          name: "Control de ciclos",
          icon: require("@/assets/icons/Flame.png"),
        },
        { name: "Corazon", icon: require("@/assets/icons/Flame.png") },
        {
          name: "Medidas corporales",
          icon: require("@/assets/icons/Flame.png"),
        },
        { name: "Movilidad", icon: require("@/assets/icons/Flame.png") },
        { name: "Nutricion", icon: require("@/assets/icons/Flame.png") },
        { name: "Repiracion", icon: require("@/assets/icons/Flame.png") },
        { name: "Signos Vitales", icon: require("@/assets/icons/Flame.png") },
        { name: "Sueño", icon: require("@/assets/icons/Flame.png") },
        { name: "Otros Datos", icon: require("@/assets/icons/Flame.png") },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.categories-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>