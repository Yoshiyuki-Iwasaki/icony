<template>
    <div>
        <ul class="tabs nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li
                v-on:click="change('1')"
                v-bind:class="{ active: isActive === '1' }"
                class="nav-link"
                role="presentation"
            >
                Category一覧
            </li>
            <li
                v-on:click="change('2')"
                v-bind:class="{ active: isActive === '2' }"
                class="nav-link"
                role="presentation"
            >
                User一覧
            </li>
            <li
                v-on:click="change('3')"
                v-bind:class="{ active: isActive === '3' }"
                class="nav-link"
                role="presentation"
            >
                お知らせ一覧
            </li>
            <li
                v-on:click="change('4')"
                v-bind:class="{ active: isActive === '4' }"
                class="nav-link"
                role="presentation"
            >
                リクエスト一覧
            </li>
        </ul>

        <ul id="pills-tabContent">
            <li v-if="isActive === '1'" class="tab-pane" role="tabpanel">
                <div v-for="category of categories" v-bind:key="category.id">
                    <p>{{ category.category_name }}</p>
                </div>
            </li>
            <li v-else-if="isActive === '2'" class="tab-pane" role="tabpanel">
                <div v-for="user of users" v-bind:key="user.id">
                    <p>{{ user.name }}</p>
                </div>
            </li>
            <li v-else-if="isActive === '3'" class="tab-pane" role="tabpanel">
                <div v-for="news of news" v-bind:key="news.id">
                    <p>{{ news.content }}</p>
                </div>
            </li>
            <li v-else-if="isActive === '4'" class="tab-pane" role="tabpanel">
                <div v-for="order of orders" v-bind:key="order.id">
                    <p>{{ order.content }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["categories", "users", "news", "orders"],
    data() {
        return {
            isActive: "1"
        };
    },
    created() {},
    methods: {
        change: function(num) {
            this.isActive = num;
        }
    }
};
</script>
