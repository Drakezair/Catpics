import React,{Component} from 'react';
import { Menu, Grid, Container,Image, Divider } from 'semantic-ui-react';

import logo from '../Assets/whiteLogo.png';

class Timeline extends Component{


    render(){
        return(
            <div>
                <Menu fixed='top' style={{backgroundColor:'rgba(140, 0, 183,0.6)'}} >
                    <Container>
                        <Image src={logo} style={{height: 50, margin: 6}} />
                        <h1 style={{marginBottom:'auto',marginTop:'auto', fontFamily:'Open sans', fontWeight:300, color:'#fff', fontSize:'1.4em'}} >std::Grams</h1>
                    </Container>
                </Menu>


            </div>
        );
    }

}

export default Timeline;