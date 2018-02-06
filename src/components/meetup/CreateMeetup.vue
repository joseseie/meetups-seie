<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <h2 class="text-xs-center">Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required>   </v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="location"
                                    label="Location"
                                    id="location"
                                    v-model="location"
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="imageUrl"
                                    label="Image Url"
                                    id="image-url"
                                    v-model="imageUrl"
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm7 offset-sm3>
                            <img :src="imageUrl" height="150">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="description"
                                    label="Description"
                                    id="description"
                                    v-model="description"
                                    multi-line
                                    required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-xs3 class="pb-5">
                            <h3>Choose a Date & Time</h3>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker v-model="date"></v-date-picker>
                            <p> {{ date }} </p>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                            {{  time }}
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                    class="primary"
                                    :disabled="!formIsValid"
                                    type="submit">Create Meetup</v-btn>
                        </v-flex>
                        {{ submittableDateTime }}
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

    export default {
        data () {
            return {
                title: '',
                location: '',
                imageUrl: '',
                description: '',
                date: null,
                time: null,
            }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                        this.location !== '' &&
                        this.imageUrl !== '' &&
                        this.description !== ''
            },
            submittableDateTime () {
                const date = new Date(this.date)

                if (typeof this.time === 'string') {
                    const hours = this.time.match(/^(\d+)/)[1]
                    const minutes = this.time.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else if (this.time !== null){
                    date.setHours(this.time.getHours())
                    date.setMinutes(this.time.getMinutes())
                }
                return  date
            }
        },
        methods: {
            onCreateMeetup () {
                if (!this.formIsValid) return

                const meetupData = {
                    title:      this.title,
                    location:   this.location,
                    imageUrl:   this.imageUrl,
                    description:this.description,
                    date:       this.submittableDateTime,
                }
                this.$store.dispatch('createMeetup',meetupData)
            }
        }
    }
</script>