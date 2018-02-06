import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        loadedMeetups: [
            {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg',
                id: 'dssfsdfjkhfsdgfd',
                title: 'New York',
                date: '2017-07-17'
            },
            {imageUrl: 'https://files.foreignaffairs.com/styles/large-crop-landscape/s3/taxonomy-images/region-france.jpg?itok=0LEfTGDA',
                id: 'kljljasljsd',
                title: 'Paris France',
                date: '2018-02-06'
            }
        ],
        user: {
            id: 'sdsdgdfgdfg',
            registeredMeetups: ['gdfgfgh']
        }
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title:      payload.title,
                location:   payload.location,
                imageUrl:   payload.imageUrl,
                description:payload.description,
                date:       payload.date,
                id:         'jose-id',
            }
        //    Gravar no firebase
            commit('createMeetup',meetup)
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        }
    }

})
