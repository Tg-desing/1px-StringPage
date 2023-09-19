import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = () => {
	const b = 0;
	return <div className={classes.backdrop}></div>;
};

const OverlayModal = () => {
	return (
		<div className={classes['calender-pos']}>
			<img src={calender} className={classes.calender}></img>
			<div className={classes['calender-container']}>
				{setImgList(imageUrlList)}
			</div>
		</div>
	);
};

const Modal = (props) => {
	const onClickBackdropHandler = () => {
		props.onClickBackdrop();
	};

	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onClick={onClickBackdropHandler}></Backdrop>,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<OverlayModal></OverlayModal>,
				document.getElementById('overlay-root')
			)}
		</>
	);
};

export default Modal;
