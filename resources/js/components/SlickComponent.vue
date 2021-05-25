<template>
    <slick ref="slick" :options="slickOptions">
        <div v-for="(user, index) in users" :key="index" class="image-thumb">
            <a :href="'/users/' + user.id">
                <img
                    v-if="user.image == null || user.image == ''"
                    src="/storage/image/noimage.png"
                />
                <img v-else :src="'/storage/image/' + user.image" />
                <p>{{ user.name }}</p>
            </a>
        </div>
    </slick>
</template>
<script>
// vue-slickをインポート
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
export default {
    // bladeから受け取るデータを指定
    props: ["images", "users"],
    // コンポーネント使用の宣言
    components: { Slick },
    data() {
        return {
            // slickの設定
            slickOptions: {
                autoplay: true,
                infinite: true,
                speed: 300,
                slidesToShow: 6,
                slidesToScroll: 1
                // responsive: [
                //     {
                //         breakpoint: 992,
                //         settings: {
                //             slidesToShow: 4,
                //             slidesToScroll: 2
                //         }
                //     },
                //     {
                //         breakpoint: 768,
                //         settings: {
                //             slidesToShow: 4,
                //             slidesToScroll: 2
                //         }
                //     }
                // ]
            }
        };
    }
    // methods: {
    //     next() {
    //         this.$refs.slick.next();
    //     },
    //     prev() {
    //         this.$refs.slick.prev();
    //     },
    //     reInit() {
    //         this.$nextTick(() => {
    //             this.$refs.slick.reSlick();
    //         });
    //     }
    // }
};
</script>
