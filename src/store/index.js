import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        loadedMeetups: [
            {imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg',
                id: 'dssfsdfjkhfsdgfd',
                title: 'New York',
                date: new Date(),
                location: 'New York',
                description: 'It\'s good to bem here to work',
            },
            {imageUrl: 'https://files.foreignaffairs.com/styles/large-crop-landscape/s3/taxonomy-images/region-france.jpg?itok=0LEfTGDA',
                id: 'kljljasljsd',
                title: 'Paris France',
                date: new Date(),
                location: 'New York',
                description: 'Come along for amazing things together...',
            }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        setLoadedMeetups (state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading',true)
            firebase.database().ref('Meetup').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                        })
                    }
                    commit('setLoadedMeetups',meetups)
                    commit('setLoading',false)
                })
                .catch( (error => {
                    console.log(error)
                    commit('setLoading',false)
                }))
        },
        createMeetup ({commit}, payload) {
            const meetup = {
                title:      payload.title,
                location:   payload.location,
                imageUrl:   payload.imageUrl,
                description:payload.description,
                date:       payload.date.toISOString(),
            }
        //    Gravar no firebase

            firebase.database().ref('Meetups').push(meetup)
                .then((data) => {
                    const key = data.key
                    console.log(data)
                    commit('createMeetup',{
                        ... meetup,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })

        },
        signUserUp ({commit}, payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser',newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading',false)
                        commit('setError',error)
                        console.log(error)
                    }
                )

        },
        signUserIn ({commit}, payload) {
            commit('setLoading',true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading',false)
                        commit('setError',error)
                        console.log(error)
                    }
                )

        },
        clearError ({commit}) {
            commit('clearError')
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
        },
        user (state) {
            return state.user
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }

})
