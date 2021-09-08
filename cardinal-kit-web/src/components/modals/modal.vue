<template>
    <div class="inline" :id="name">
        <a class="modal-show" href="#modal">{{label}}</a>
        <div class="modal " id="modal">
            <div class="modal-content">
                <a class="modal-hide" href="#">✕</a>
                <h2 class="m-4">{{title}}</h2>
                <p class="m-4">
                    {{content}}
                </p>
                <div class="inline m-4">
                    <a href="#" class="m-1 button" @click="accept">Yes</a>
                    <a href="#" class="m-1 button">No</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["label", "title", "content", "name"],
    methods: {
        accept(){
            this.$emit("remove", this.name);
        }
    }
}
</script>
<style scoped  lang="scss">
.inline {
    display: inline-flex;
}
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  animation: modal-show 0.5s 1 forwards;
}

.modal-content {
  position: relative;
  width: 45%;
  background-color: white;
}

.modal:target {
  display: flex;
  z-index: 100;
}

.modal-show {
    display: inline-block;
    background-color: transparent;
    border: none;
    border-radius: 0.25rem;
    color: black;
    cursor: pointer;
    font-size: 16px;
    padding: 0.5rem 0.75rem;
    font-family: "Arial";
    text-decoration: none;
    transition: color .3s ease;
    
    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
        background-color: #ff96c8;
        transform: scale(1.1) rotateX(0);
    }
}
.button {
    display: inline-block;
    background-color: #ff96c8;
    width: 5rem;
    border: none;
    text-align: center;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 0.5rem 0.75rem;
    font-family: "Arial";
    text-decoration: none;
    transition: color .3s ease;

    &:hover {
        width: 5rem;
        cursor: pointer;
        background-color: #ff96c8;
        transform: scale(1.1) rotateX(0);
    }
}

.modal-hide {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  padding: 0;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  font-size: 18px;
  text-align: center;
  color: black;
  text-decoration: none;
}

@keyframes modal-show {
	0% { opacity: 0; }
	100% { opacity: 1; }
}
</style>