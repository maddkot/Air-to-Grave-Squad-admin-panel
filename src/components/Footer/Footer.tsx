import styles from './Footer.module.scss';

const Footer: React.FC = () => {
    const data = new Date();
    const actualYear = data.getFullYear() 
    return (
        <footer className={styles.footer}>
            <p style={{marginRight: 5, color: 'black'}}>&copy; {actualYear} A2G by Madd_Viking and MaddKot</p>
            
        </footer>
    )
}

export default Footer;