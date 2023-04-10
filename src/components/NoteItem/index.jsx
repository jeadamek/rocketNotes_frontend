// importar icones usados ( x e +)
import { FiPlus, FiX } from 'react-icons/fi';

import { Container } from './styles';

// isNew - para saber se a nota é nova
// value - o valor que ela tera
// onClick - para o botao
// ...rest - todo restante que receber
export function NoteItem({ isNew, value, onClick, ...rest }) {
  return(
    <Container isNew={isNew}>
      <input
        type="text"
        value={value} 
        readOnly={!isNew} // se nao for novo pode editar
        {...rest}
      />

      <button
        type="button"
        onClick={onClick}
        //classes condicionais
        className={isNew ? 'button-add' : 'button-delete'}
      >
        {/* se for novo renderiza o + senao o x */}
        { isNew ? <FiPlus /> : <FiX /> }
      </button>
    </Container>
  )
}