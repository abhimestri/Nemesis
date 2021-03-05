import classes from './Header.module.css'

const header = () => {
    return(
        <div className={classes.header}>
            <p className={classes.companyLabel}> Nemesis Consultants LLP </p>
        </div>
    )
} 

export default header