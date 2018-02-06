<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/meetups/new"  class="primary">Organize Meetups</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2">
            <v-flex xs12>
                <v-carousel style="cursor: pointer">
                    <v-carousel-item
                            v-for="meetup in meetups"
                            :src="meetup.imageUrl"
                            :key="meetup.id"
                            @click="onLoadMeetup(meetup.id)">
                        <div class="title">
                            {{  meetup.title }}
                        </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 class="text-xs-center">
                <p>Join Our meetup</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data () {
            return {
                meetups: [
                    {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg',id: 'dssfsdfjkhfsdgfd', title: 'New York'},
                    {imageUrl: 'https://files.foreignaffairs.com/styles/large-crop-landscape/s3/taxonomy-images/region-france.jpg?itok=0LEfTGDA',id: 'kljljasljsd', title: 'Paris France'}
                ]
            }
        },
        methods: {
            onLoadMeetup(id) {
                this.$router.push('/meetups/' + id)
            }
        }
    }
</script>
<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,0.5);
        color: white;
        font-size: 2em;
        padding: 20px;
    }
</style>