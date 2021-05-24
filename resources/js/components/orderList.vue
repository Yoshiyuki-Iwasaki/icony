<template>
    <div class="orderList">
        <ul class="orderList-list">
            <li class="orderList-item" v-for="order of orders">
                <a class="orderList-link" :href="'/orders/' + order.id">
                    <figure class="orderList-image">
                        <img src="/storage/image/noimage.png" alt="" />
                    </figure>
                    <p class="orderList-text">{{ order.content }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["orders"],
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>

<style scoped>
.orderList-list {
    margin: 15px 15px 0;
    display: flex;
    flex-wrap: wrap;
}
.orderList-item {
    margin-right: 10px;
    width: calc(25% - 8px);
}
.orderList-item:nth-child(4n) {
    margin-right: 0;
}
.orderList-image {
    margin: 5px 0 0;
}
</style>
