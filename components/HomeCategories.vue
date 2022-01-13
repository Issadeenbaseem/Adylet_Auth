<template>
    <section class="mt-100">
        <div class="pxp-container">
            <h2 class="pxp-section-h2 text-center">Browse by Category</h2>
            <!-- <p class="pxp-text-light text-center">Browse what you need with our categories</p> -->

            <div class="row mt-4 mt-md-5 pxp-animate-in pxp-animate-in-top">
                <div v-for=" category in categories" v-bind:key="category.id" class="col-12 col-md-4 col-lg-3 col-xxl-2 pxp-categories-card-2-container">
                    <a href="javascript:;" class="pxp-categories-card-2">
                        <div class="pxp-categories-card-2-icon-container">
                            <div class="pxp-categories-card-2-icon">
                                <img style="width: 48px;" :src="category.attributes.icon.data == null ? 'images/adylet-icon.png' : category.attributes.icon.data.attributes.url" />
                            </div>
                        </div>
                        <div class="pxp-categories-card-2-title">{{category.attributes.name}}</div>
                        <div class="pxp-categories-card-2-subtitle">0 ads</div>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>


<script>

export default {
    props: ['categories'],
}
</script>
