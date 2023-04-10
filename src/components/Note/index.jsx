import { Container } from "./styles";
import { Tag } from "../Tag";

// vamos receber diversas propriedades, por isso recebemos data
export function Note({ data, ...rest}) {
  return(
    <Container {...rest}>
      <h1>{data.title}</h1>

    {/* renderiza as tags, se elas existirem*/}
      {
        // se existir tags, cria um footer com todas as tags
        data.tags &&
        <footer>
          {
            data.tags.map(tag => <Tag key={tag.id} title={tag.name}/>)
          }
        </footer>
      }
    </Container>
  )
}