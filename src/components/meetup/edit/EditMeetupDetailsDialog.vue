<template>
    <v-dialog width="350px" persistent v-model="editDialog">
        <v-btn flat fab slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container row wrap>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="title"
                                required></v-text-field>
                            <v-text-field
                                    name="description"
                                    label="Description"
                                    id="description"
                                    multi-line
                                    v-model="description"
                                    required></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat class="blue--tex darken-1" @click="editDialog = false">Close</v-btn>
                            <v-btn flat class="blue--tex darken-1" @click="onSaveChanges">Save</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetup'],
        data () {
            return {
                editDialog: false,
                description: this.meetup.description,
                title: this.meetup.title
            }
        },
        methods: {
            onSaveChanges () {
                if (this.title.trim() === '' || this.description.trim() === '') {
                    return
                }
                this.editDialog = false
                this.$store.dispatch('updateMeetupData',{
                    id: this.meetup.id,
                    title: this.title,
                    description: this.description,
                })
            }
        }
    }
</script>