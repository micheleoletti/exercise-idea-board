import IdeaCard from '@/components/IdeaCard'
import { render } from '@testing-library/react'
import { Idea } from 'models/idea'

describe('Idea card', () => {
  it('title autofocused on title creation ', () => {
    let idea: Idea = {
      uuid: 'uuid',
      title: "",
      description: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    render(<IdeaCard idea={idea}/>)

    
    
  })
})
