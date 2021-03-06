import React, { useState } from "react"

export const StoryContext = React.createContext()

export const StoryProvider = (props) => {
    const [stories, setStories] = useState([])
    // Search terms will be used for the search bar in completed stories view
    const [searchTerms, setSearchTerms] = useState("")

    const getStories = () => {
        return fetch("https://publish-or-perish-api.herokuapp.com/stories")
        .then(r => r.json())
        .then(setStories)
    }

    const addStory = story => {
        return fetch("https://publish-or-perish-api.herokuapp.com/stories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(story)
        })
        .then(getStories)
    }

    const editStory = story => {
        return fetch(`https://publish-or-perish-api.herokuapp.com/stories/${story.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(story)
        })
        .then(getStories)
    }

    const deleteStory = story => {
        return fetch(`https://publish-or-perish-api.herokuapp.com/stories/${story.id}`, {
            method: "DELETE"
        })
        .then(getStories)
    }

    return (
        <StoryContext.Provider value={{stories, setStories, getStories, addStory, editStory, deleteStory, searchTerms, setSearchTerms}}>
            {props.children}
        </StoryContext.Provider>
    )
}