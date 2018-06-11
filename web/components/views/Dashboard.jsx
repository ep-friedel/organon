import DefaultPage from 'CONNECTED/DefaultPage'
import React from 'react'
import { connect } from 'react-redux'
import { formatDateTime } from 'UTILS/date'
import { fromJS } from 'immutable'
import { load_posts } from 'STORE/actions.js'

const AnimantedLineStyle = {
  background: '#929292',
  width: '100%',
  height: '10px',
  marginTop: '5px',
}
const AnimatedLine = ({ style, ...props }) => <div style={{ ...AnimantedLineStyle, ...style }} {...props} />
const AnimatedLineHalf = ({ style, ...props }) => <AnimatedLine style={{ width: '50%', ...style }} {...props} />

const PostFrame = ({ children, post, className = '' }) => (
  <div className={`post ${className}`}>
    <div className="top">
      <span>
        {post.get('name')}
        {post.get('date') && ` - ${formatDateTime(post.get('date'))}`}
      </span>
    </div>
    <div className="body">{children}</div>
  </div>
)

const Post = ({ post }) => {
  return (
    <PostFrame post={post}>
      {post.get('type') === 'event' && <Event />}
      {post.get('type') === 'note' && <Note />}
    </PostFrame>
  )
}

const BusyPost = () => (
  <PostFrame post={{ get: type => type === 'name' && <AnimatedLineHalf /> }} className="busy">
    <AnimatedLine />
    <AnimatedLine />
    <AnimatedLineHalf />
  </PostFrame>
)

const BusyNoteStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  margin: '10px',
  padding: '5px',
  background: 'yellow',
  border: 'solid',
}
const BusyNote = () => (
  <div style={BusyNoteStyle}>
    <span className="fa fa-refresh fa-spin fa-lg" />
    <p>Posts werden geladen</p>
  </div>
)

export class Dashboard extends React.Component {
  componentDidMount() {
    // this.props.load_posts()
  }

  renderBusyPost() {
    return <Post post={{ name: '' }} />
  }

  render() {
    const { posts, app } = this.props
    const busy = app.get('busy').includes('LOAD_POSTS')

    console.log(this.props)

    return (
      <DefaultPage>
        {busy && <BusyNote />}
        {!posts.length && busy ? <BusyPost /> : posts.map(post => <Post post={post} key={post.get('id')} />)}
      </DefaultPage>
    )
  }
}

const mapStoreToProps = (store, ownProps) => ({
  app: store.get('app'),
  posts: store.get('posts'),
})

export default connect(
  mapStoreToProps,
  { load_posts },
)(Dashboard)
