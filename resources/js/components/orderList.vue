<template>
    <ul>
        <li v-for="order of orders">{{ order.content }}</div>
    </ul>
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
