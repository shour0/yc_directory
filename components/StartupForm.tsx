'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import MDEditor from "@uiw/react-md-editor"
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

const StartupForm = () => {
  const [errors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("")

  //  const handleFormSubmit = () => {}

  // const [state, formAction, isPending] = useActionState(handleFormSubmit, {
  //   error: "",
  //   status: "INITIAL",
    
  // })

 
  const isPending = false

  return (
    <form action={() => {}} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>Title</label>
        <Input 
        id='title'
        name='title' 
        className='startup-form_input' 
        required
        placeholder='Startup title'
        />
      </div>
      {errors.title && <p className='startup-form_error'>{errors.title}</p>}

      <div>
        <label htmlFor='description' className='startup-form_label'>description</label>
        <Textarea 
        id='description'
        name='description' 
        className='startup-form_textarea' 
        required
        placeholder='Startup Description'
        />
      </div>
      {errors.description && <p className='startup-form_error'>{errors.description}</p>}

      <div>
        <label htmlFor='category' className='startup-form_label'>Category</label>
        <Input 
        id='category'
        name='category' 
        className='startup-form_input' 
        required
        placeholder='Startup Category (Teach, Health, Education...)'
        />
      </div>
      {errors.category && <p className='startup-form_error'>{errors.category}</p>}

      <div>
        <label htmlFor='link' className='startup-form_label'>Image URL</label>
        <Input 
        id='link'
        name='link' 
        className='startup-form_input' 
        required
        placeholder='Startup Image URL'
        />
      </div>
      {errors.link && <p className='startup-form_error'>{errors.link}</p>}

      <div data-color-mode="light">
        <label htmlFor='pitch' className='startup-form_label'>Image URL</label>
        <MDEditor
        value={pitch}
        onChange={(value) => setPitch(value as string)}
        id='pitch'
        preview='edit'
        height={300}
        style={{borderRadius: 20, overflow: 'hidden'}}
        textareaProps={{
          placeholder:
          'Briefly describe your idea and what problem it solves',
        }}
        previewOptions={{
          disallowedElements: ["style"]
        }}
        />
      </div>
      {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending ? 'Submiting...' : 'Submit Your Pitch'}
           <Send className='size-6 m-2' />
      </Button>
    </form>
  )
}

export default StartupForm