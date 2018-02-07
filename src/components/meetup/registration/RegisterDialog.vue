<template>
    <v-dialog width="350px" persistent v-model="visible">
        <v-btn primary accent slot="activator">
            {{ userIsRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                        <v-card-title v-else>Register for Meetup?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>

                        <v-card-text>You can always change you decision later on.</v-card-text>

                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn
                                class="red--text darken-1"
                                flat
                                @click="visible = false">Cancel</v-btn>
                            <v-btn
                                class="green--text darken-1"
                                flat
                                @click="onAgree">Confirm</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetupId'],
        data () {
            return {
                visible: false,
                editableDate: null
            }
        },
        computed: {
            userIsRegistered () {
                return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                    return meetupId === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree () {

                if (this.userIsRegistered) {
                    this.$store.dispatch('unRegisterUserForMeetup', this.meetupId)
                } else {
                    this.$store.dispatch('registerUserForMeetup', this.meetupId)
                }

            }
        }
    }
</script>