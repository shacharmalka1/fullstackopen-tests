import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor  } from '@testing-library/react'
import Blog from './Blog'
import { prettyDOM } from '@testing-library/dom'
import CreateBlog from '../CreateBlog'

describe('Blog component tests', () => {
  let blog = {
    title:"saddg54rt",
    author:"r4",
    url:"3r2",
    likes:13
  }
  const getBlog = ()=>{
    return render(
      <Blog blog={blog} updateBlog={mockUpdateBlog} />
      )
  }
  let mockUpdateBlog = jest.fn()

  test('renders title', () => {
    const component = getBlog()
    expect(component.container).toHaveTextContent(
      'saddg54rt'
    )
  })

  test('clicking the view button displays url and number of likes', () => {
    const component = getBlog()

    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      '3r2'
    )

    expect(component.container).toHaveTextContent(
      '13'
    )

  })
    test('should verify the like button clicked twice',async () => {
      const mockHandler = jest.fn()

      const component = render(
        <Blog blog={blog} handleLikeChange={mockHandler} />
      )
  
      const buttonView = component.getByText('View')
      fireEvent.click(buttonView)

      // console.log(prettyDOM(button));
      const buttonLike = component.getByText('Like')
      fireEvent.click(buttonLike)
      fireEvent.click(buttonLike)
      expect(mockHandler.mock.calls).toHaveLength(2)
      })

      test('create a new blog', () => {
        const component = render(
          <CreateBlog />
        )
      
        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author1')
        const url = component.container.querySelector('#url')
      
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(url).toBeDefined()
      })
    })

