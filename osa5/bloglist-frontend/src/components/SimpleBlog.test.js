import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Chocohili',
      author: 'Innanen',
      url: 'chocochili.net',
      likes: 4
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const descriptionDiv = blogComponent.find('.description')

    expect(descriptionDiv.text()).toContain(blog.title)
  })
  it('renders author', () => {
    const blog = {
      title: 'Eilista paistoa',
      author: 'Johanna',
      url: 'eilistapaistoa.com',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const descriptionDiv = blogComponent.find('.description')

    expect(descriptionDiv.text()).toContain(blog.author)
  })
  it('renders likes', () => {
    const blog = {
      title: 'Minttua ja mustikoita',
      author: 'Kesänen',
      url: 'https://www.kotipuutarha.fi/minttua-ja-mustikoita/',
      likes: 6
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likesDiv = blogComponent.find('.likes')

    expect(likesDiv.text()).toContain(blog.likes)
  })
  it('clicking the button twice calls event handler twice', () => {
    const blog = {
        title: 'Chiliä ja sivuhuomioita',
        author: 'Taata',
        url: 'http://chilivaari.blogspot.fi/',
        likes: 7
      }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})
