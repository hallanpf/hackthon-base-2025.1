import rick from '../../assets/home-image.png'
const Home = () => {
  return (
    <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', padding: '40px'}}>
      <h2 style={{width: '480px', color:'#12B0C9', textAlign:'center'}}>Está preparado para navegar no mundo de Rick and Morty?</h2>
      <img src={rick} alt="Rick and Morty" style={{width: '480px', height: 'auto', borderRadius: '10px', marginTop: '30px'}} />
      <button style={{marginTop: '30px', padding: '20px 40px', backgroundColor: '#12B0C9', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
        Iniciar Aventura
      </button>
    </div>
  )
}

export default Home