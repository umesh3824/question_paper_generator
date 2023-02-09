import { Link } from 'react-router-dom';
export default function Menu() {
  return (
 <div className='text-left'>
      <ul>
        <li><Link to="/generate_paper">Generate Question Paper</Link></li>
        <li><Link to="/manage_question">Manage Questions</Link></li>
        <li><Link to="/manage_subject">Manage Subject</Link></li>
        <li><Link to="/abc">User Profile</Link></li>
      </ul>
 </div>
  );
}
