import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonGroup,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label
} from 'reactstrap';
import {connect} from 'react-redux';
import {setRole} from 'states/post-actions.js';

import {createPost, input, inputDanger, toggleColor, setColorToggle, selectColor, formToggle} from 'states/post-actions.js';

import './PostForm.css';

class PostForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        colorToggle: PropTypes.bool,
        color: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.colorToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleColorToggle = this.handleColorToggle.bind(this);
        this.handleFormToggle = this.handleFormToggle.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    componentDidMount() {
        this.handleRoleChange('parent');
    }

    render() {
        const {inputValue, colorToggle, color, formToggle} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Button onClick={this.handleFormToggle} className="formShow" color="warning">+</Button>
                    <Modal isOpen={formToggle} toggle={this.handleFormToggle}>
                        <ModalHeader>便利貼</ModalHeader>
                        <ModalBody>
                            <Form>
                                <Label>想對家人說些什麼?</Label>
                                <Input type="textarea" name="text" placeholder="" getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange}/>
                            </Form>
                            <div className='text-right mt-3'>
                                <ButtonGroup className="role mr-3">
                                    <Button className={this.props.role==="parent" ? "selectparent":"roleBtn parent"} onClick={()=>this.handleRoleChange('parent')}><span className='btn-text'>父母</span></Button>
                                    <Button className={this.props.role==="child" ? "selectchild":"roleBtn child"} onClick={()=>this.handleRoleChange('child')}><span className='btn-text'>孩子</span></Button>
                                </ButtonGroup>
                                <ButtonDropdown type='buttom' isOpen={colorToggle} toggle={this.handleColorToggle}>
                                    <DropdownToggle className='color-toggle mr-3' type='button' caret color="secondary" style={{backgroundColor: this.getColor(color)}}>
                                        <i></i>&nbsp;{
                                            color === 'na' ? 'Color' : color
                                        }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Yellow')}><i></i>&nbsp;&nbsp;Yellow</DropdownItem>
                                        <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Pink')}><i></i>&nbsp;&nbsp;Pink</DropdownItem>
                                        <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Blue')}><i></i>&nbsp;&nbsp;Blue</DropdownItem>
                                        <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Green')}><i></i>&nbsp;&nbsp;Green</DropdownItem>
                                        <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Purple')}><i></i>&nbsp;&nbsp;Purple</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <Button className='btn-post align-self-end' color="warning" onClick={this.handlePost}>Post</Button>
                            </div>
                        </ModalBody>
                        <ModalFooter>

                        </ModalFooter>
                    </Modal>
            </div>
        );
    }

    handleDropdownSelect(color) {
        this.props.dispatch(selectColor(color));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleRoleChange(role) {
        this.props.dispatch(setRole(role));
    }

    handleColorToggle(e) {
        this.props.dispatch(toggleColor());
    }

    handlePost() {
        if (this.props.color === 'na') {
            console.log(this.props.colorToggle);
            this.props.dispatch(setColorToggle(true));
            return;
        }
        if (!this.props.inputValue) {
            this.props.dispatch(inputDanger(true));
            return;
        }
        console.log("PF");
        console.log(this.props.role);
        this.props.dispatch(formToggle());
        this.props.dispatch(createPost(this.props.searchUser, this.props.role,this.props.inputValue, this.props.color));
        this.props.dispatch(input(''));
        this.props.dispatch(selectColor('na'));
    }

    handleFormToggle(e) {
        this.props.dispatch(formToggle());
    }

    getColor(color) {
        console.log(color);
        switch(color) {
            case 'Yellow': return 'rgb(255, 253, 152)';
            case 'Pink' : return 'rgb(239, 168, 184)';
            case 'Blue': return 'rgb(159, 187, 204)';
            case 'Green' : return 'rgb(189, 228, 167)';
            case 'Purple': return 'rgb(174, 105, 189)';
            default: return 'white';
        }
    }
}

export default connect(state => ({
    ...state.postForm,
    role : state.role,
    searchUser: state.searchLogin.searchUser
}))(PostForm);
