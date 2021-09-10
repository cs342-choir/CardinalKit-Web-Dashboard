<template>
    <div class="container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"  v-for="obj in data" :key="obj.label">
                <a href="#" class="text-capitalize">{{obj.label}}</a>
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
        }
    }
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

.breadcrumb-item a{
  color: #6c757d;
  text-decoration: none;
  font-size: 28px;
}

.breadcrumb-item a {
    &:hover, &:focus {
        color: rgb(0, 0, 0);
        font-weight: 700;
    }
}
</style>