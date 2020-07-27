import React, { useState } from 'react'
//scss
import './styles.scss'
//icons
import BookIcon from '@material-ui/icons/Book';
//Animation
import FadeIn from 'react-fade-in'
//component Material Ui
import Avatar from '@material-ui/core/Avatar'
import Pagination from '@material-ui/lab/Pagination';


const ResultSearch = ({ repos, infoUser, error }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(9);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPost = repos.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(repos.length / postPerPage); i++) {
        pageNumbers.push(i);
    }


    return (
        <div className="container-result-search" >
            <p className="errorText">
                {error}
            </p>
            {
                infoUser && (
                    <FadeIn>
                        <div className="card-user">
                            <Avatar
                                className="avatar-user"
                                alt={infoUser.name}
                                src={infoUser.avatar_url} />
                            <h3>{infoUser.name}</h3>
                            <span>{infoUser.login}</span>
                            <span>{infoUser.location}</span>


                            <Pagination
                                size="small"
                                count={pageNumbers.length}
                                defaultPage={1}
                                page={currentPage}
                                onChange={(event, page) => setCurrentPage(page)}
                            />
                        </div>
                    </FadeIn>
                )
            }
            {
                currentPost.length > 0 && (
                    <div className="repository-user" >
                        {
                            currentPost.map((repo, index) => {
                                const key = index
                                return (
                                    <FadeIn
                                        key={key}
                                        className="card-repository">
                                        <BookIcon className="icon-repository" />
                                        <h5>{repo.name}</h5>

                                    </FadeIn>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}
export default ResultSearch;