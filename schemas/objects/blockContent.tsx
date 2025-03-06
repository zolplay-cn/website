import { defineType } from 'sanity'
import styled from 'styled-components'

const HighlightIcon = () => <span style={{ fontWeight: 'bold' }}>H</span>
const Highlight = styled.span`
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text !important;
  background: linear-gradient(to right, #e36767, #846ceb);
`
const HighlightDecorator = (props) => <Highlight>{props.children}</Highlight>
const RedIcon = () => <span style={{ color: 'red' }}>R</span>
function RedDecorator(props) {
  return <span style={{ color: 'red' }}>{props.children}</span>
}
const GreenIcon = () => <span style={{ color: 'green' }}>G</span>
function GreenDecorator(props) {
  return <span style={{ color: 'green' }}>{props.children}</span>
}

export const blockContentSchema = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: HighlightIcon,
            component: HighlightDecorator,
          },
          {
            title: 'Red text',
            value: 'red',
            icon: RedIcon,
            component: RedDecorator,
          },
          {
            title: 'Green text',
            value: 'green',
            icon: GreenIcon,
            component: GreenDecorator,
          },
        ],
      },
    },
    {
      type: 'image',
    },
    {
      type: 'object',
      name: 'ourStacks',
      title: 'Our Stacks',
      fields: [
        {
          type: 'string',
          name: 'id',
          title: 'ID',
        },
      ],
      preview: {
        select: {
          id: 'id',
        },
        prepare({ id }) {
          return {
            title: `Our Stacks #${id}`,
          }
        },
      },
    },
    {
      type: 'object',
      name: 'ourTools',
      title: 'Our Tools',
      fields: [
        {
          type: 'string',
          name: 'id',
          title: 'ID',
        },
      ],
      preview: {
        select: {
          id: 'id',
        },
        prepare({ id }) {
          return {
            title: `Our Tools #${id}`,
          }
        },
      },
    },
    {
      type: 'object',
      name: 'benefits',
      title: 'Benefits',
      fields: [
        {
          type: 'string',
          name: 'id',
          title: 'ID',
        },
      ],
      preview: {
        select: {
          id: 'id',
        },
        prepare({ id }) {
          return {
            title: `Benefits #${id}`,
          }
        },
      },
    },
  ],
})
