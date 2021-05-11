<template>
    <span class="float-right">
        <button
            v-if="!followed"
            type="button"
            class="btn-sm shadow-none border border-primary p-2"
            @click="follow(userId)"
        >
            <i class="mr-1 fas fa-user-plus"></i>フォロー
        </button>
        <button
            v-else
            type="button"
            class="btn-sm shadow-none border border-primary p-2 bg-primary text-white"
            @click="unfollow(userId)"
        >
            <i class="mr-1 fas fa-user-check"></i>フォロー中
        </button>
        <p>フォロワー数: {{ followCount }}</p>
    </span>
</template>

<script>
export default {
    props: ["userId", "defaultFollowed", "defaultCount"],
    data() {
        return {
            followed: false,
            followCount: 0
        };
    },
    created() {
        this.followed = this.defaultFollowed;
        this.followCount = this.defaultCount;
    },

    methods: {
        follow(userId) {
            let url = `/users/${userId}/follow`;

            axios
                .post(url)
                .then(response => {
                    this.followed = true;
                    this.followCount = response.data.followCount;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        unfollow(userId) {
            let url = `/users/${userId}/unfollow`;

            axios
                .post(url)
                .then(response => {
                    this.followed = false;
                    this.followCount = response.data.followCount;
                })
                .catch(error => {
                    alert(error);
                });
        }
    }
};
</script>
