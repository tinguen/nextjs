import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FormGroup, Label, TextArea, Button } from './forms'
import { createNewComment } from '../redux/reducers/posts'

type Props = {
  id: number
}

const CreateComment = ({ id }: Props) => {
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  return (
    <>
      <FormGroup>
        <Label>Leave a comment</Label>
        <TextArea value={newComment} onChange={(e) => setNewComment(e.target.value)} />

        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            dispatch(createNewComment(id, newComment))
            setNewComment('')
          }}
        >
          Create
        </Button>
      </FormGroup>
    </>
  )
}

export default CreateComment
