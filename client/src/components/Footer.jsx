import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Footer } from 'flowbite-react'
import { BsDropbox, BsFacebook, BsGithub, BsInstagram } from "react-icons/bs"

const FooterCom = () => {
    return (
        <Footer container className='mt-auto dark:bg-zinc-800 border-t-4 text-lg rounded-none border-emerald-500 flex-col px-2 sm:px-4'>
            <div className='w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:justify-evenly items-center'>

                <div className='grid md:mt-0 mt-5 grid-cols-1 xs:grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-2 sm:mt-0'>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link href='#'>Privacy Policy</Footer.Link>
                            <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
                            <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
                            <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='About' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://www.100jsprojects.com'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                100 JS Projects
                            </Footer.Link>
                            <Footer.Link
                                href='/about'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Sahand's Blog
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow us' />
                        <Footer.LinkGroup col>
                            <Footer.Link
                                href='https://www.github.com/https://github.com/pwrobel03'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Github
                            </Footer.Link>
                            <Footer.Link href='#'>Discord</Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
                <div>
                    <Link
                        to={"/"}
                        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                        <span className='px-2 py-1 text-white rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-200'>Sahand's</span>Blog
                    </Link>
                </div>
            </div>
            <div className='flex sm:flex-row flex-col gap-2 sm:justify-between mt-5 py-4 border-t-2'>
                <Footer.Copyright href='/' by="sahand's blog" year={new Date().getFullYear()} />
                <div className='flex xs:flex-row flex-col gap-4'>
                    <Footer.Icon href='#' icon={BsFacebook} />
                    <Footer.Icon href='#' icon={BsInstagram} />
                    <Footer.Icon href='#' icon={BsDropbox} />
                    <Footer.Icon href='#' icon={BsGithub} />
                </div>
            </div>
        </Footer >
    )
}

export default FooterCom