<template>
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"  v-for="obj in data" :key="obj.label">
                <span @click="redirect(obj)" class="text-capitalize">{{obj.label}}</span>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: "breadCrumb",
    props: {
        data: {
            type: Array,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        studyId: {
            type: String,
            required: true
        }
    },
    methods: {
        redirect(obj){
            let data = { 
                name: obj.name, 
              //  ...(obj.params && {params: obj.params}), 
                params: {...obj.params},
                query:{userId: this.userId, studyId: this.studyId}
            }
            this.$router.push(data)
        }
    },
}
</script>
<style lang="scss">
.breadcrumb{
  padding: 1rem 4rem;
  width: auto;
  list-style: none;
}
  
.breadcrumb-item{
  display: inline;
  font-size: 18px;
}

.breadcrumb li+li:before{
  padding: 8px;
  color: black;
  content: ">";
}

.breadcrumb-item span{
  color: #6c757d;
  text-decoration: none;
  font-size: 28px;
  cursor: pointer;
}

.breadcrumb-item span {
    &:hover, &:focus {
        color: rgb(0, 0, 0);
        font-weight: 700;
        cursor: pointer;
    }
}
</style>