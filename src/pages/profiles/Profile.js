import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import {useCurrentUser} from "../../contexts/CurrentUserContext";
import {Link} from "react-router-dom";
import Avatar from "../../components/Avatar";
import {Button} from "react-bootstrap";
import {useSetProfileData} from "../../contexts/ProfileDataContext";
import PropTypes from 'prop-types';


const Profile = (props) => {
    const {
        profile,
        mobile,
        imageSize = 55
    } = props;
    const {id, following_id, image, owner} = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const {handleFollow, handleUnfollow} = useSetProfileData();

Profile.propTypes = {
    profile: PropTypes.shape({
      id: PropTypes.string.isRequired,
      following_id: PropTypes.string, // Optional property
      image: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired, // Add owner validation
    }).isRequired,
    mobile: PropTypes.bool, // Optional prop, adjust type if needed
    imageSize: PropTypes.number, // Optional prop, adjust type if needed
  };
  
    return (
        <div className={
            `my-3 d-flex align-items-center ${
                mobile && "flex-column"
            }`
        }>
            <div>
                <Link className="align-self-center"
                    to={
                        `/profiles/${id}`
                }>
                    <Avatar src={image}
                        height={imageSize}/>
                </Link>
            </div>
            <div className={
                `mx-2 ${
                    styles.WordBreak
                }`
            }>
                <strong>{owner}</strong>
            </div>
            <div className={
                `text-right ${
                    !mobile && "ml-auto"
                }`
            }>
                {
                !mobile && currentUser && ! is_owner && (following_id ? (
                    <Button className={
                            `${
                                btnStyles.Button
                            } ${
                                btnStyles.BlackOutline
                            }`
                        }
                        onClick={
                            () => handleUnfollow(profile)
                    }>
                        unfollow
                    </Button>
                ) : (
                    <Button className={
                            `${
                                btnStyles.Button
                            } ${
                                btnStyles.Black
                            }`
                        }
                        onClick={
                            () => handleFollow(profile)
                    }>
                        follow
                    </Button>
                ))
            } </div>
        </div>
    );
};

export default Profile;
