const Test = () => {
  const isActive = true
  const variant = 'primary'
  return <div className={`container ${isActive ? 'active' : ''} ${variant}`}>Test</div>
}

export default Test
