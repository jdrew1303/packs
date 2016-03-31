export default {
  column: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    flexBasis: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  row: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    flexBasis: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  panel: {
    boxSizing: 'border-box',
    flex: 1,
    flexBasis: 'auto',
    borderRadius: '0.5rem',
    boxShadow: '0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.1)',
    background: '#fff'
  },
  heading: {
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  padding: (t, r, b, l) => {
    return {
      paddingTop: `${t}rem`,
      paddingRight: `${isNaN(r) && t || r}rem`,
      paddingBottom: `${isNaN(b) && t || b}rem`,
      paddingLeft: `${isNaN(l) && t || l}rem`
    }
  },
  margin: (t, r, b, l) => {
    return {
      marginTop: `${t}rem`,
      marginRight: `${isNaN(r) && t || r}rem`,
      marginBottom: `${isNaN(b) && t || b}rem`,
      marginLeft: `${isNaN(l) && t || l}rem`
    }
  }
}