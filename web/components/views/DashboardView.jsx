import React from 'react'
import { connect } from 'react-redux'
import { load_posts } from 'STORE/actions.js'

const PostFrame = ({ children, post, className = '' }) => (
  <div className={`post ${className}`}>
    <div className="top">
      <span>
        {post.name} - {formatDateTime(post.date)}
      </span>
    </div>
    <div className="body">{children}</div>
  </div>
)

const Post = ({ post }) => (
  <PostFrame post={post}>
    {post.type === 'event' && <Event />}
    {post.type === 'note' && <Note />}
  </PostFrame>
)

const BusyPost = () => (
  <Post post={{ name: '', date: Date.now() }} className="busy">
    <div className="animatedLine" />
    <div className="animatedLine" />
    <div className="animatedLine width50" />
  </Post>
)

const BusyNote = () => (
  <div className="busyNote">
    <span className="fa fa-refresh fa-spin fa-lg" />
    <p>Posts werden geladen</p>
  </div>
)

export class DashboardView extends React.Component {
  componentDidMount() {
    this.props.load_posts()
  }

  renderBusyPost() {
    return <Post post={{ name: '' }} />
  }

  render() {
    const { posts, app } = this.props
    const busy = app.busy.includes('LOAD_POSTS')

    return (
      <DefaultPage>
        {busy && <BusyNote />}
        {!posts.length && busy ? <BusyPost /> : post.map(post => <Post post={post} key={post.id} />)}
      </DefaultPage>
    )
  }
}

const mapStoreToProps = (store, ownProps) => ({
  app: store.app,
  posts: store.posts,
})

export default connect(mapStoreToProps, { load_posts })(DashboardView)
