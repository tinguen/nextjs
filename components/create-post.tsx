import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { FormGroup, Label, Input, TextArea, Button } from './forms'
import { createNewPost } from '../redux/reducers/posts'

const CreatePost = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  return (
    <>
      <FormGroup>
        <Label htmlFor="label">Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} id="label" />
      </FormGroup>
      <FormGroup>
        <Label>Body</Label>
        <TextArea value={body} onChange={(e) => setBody(e.target.value)} />

        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            dispatch(createNewPost(title, body))
            setTitle('')
            setBody('')
            router.push('/')
          }}
        >
          Create
        </Button>
      </FormGroup>
    </>
  )
}

export default CreatePost
