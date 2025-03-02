
import { useState } from "react";

function KK(){
    const characters=[{id:1,name:"Guevara",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiI1IiwiRXllcyI6IjEiLCJTaG9lcyI6IjEiLCJQYW50cyI6IjEiLCJUb3AiOiIxMyIsIkJlbHQiOiIxIiwiSmFja2V0IjoiMSIsIkhhaXIiOiIxNiIsImV5ZXNUb25lIjoiNTQyYTBlIiwicGFudHNUb25lIjoiMWEyMjRhIiwidG9wVG9uZSI6ImZmZmZmZiIsInNob2VzVG9uZSI6ImRiYTQwMCIsImphY2tldFRvbmUiOiI1NTM3MDcifQ==/1/show.png"},
        {id:2,name:"Ajwan",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiI4IiwiU2hvZXMiOiIxIiwiUGFudHMiOiIxIiwiVG9wIjoiMyIsIkhhaXIiOiIyMiIsInBhbnRzVG9uZSI6ImZhZjBlNiIsInBhbnRzVG9uZTIiOiJmYWYwZTYiLCJ0b3BUb25lIjoiODAwMDAwIiwidG9wVG9uZTIiOiI4MDAwMDAiLCJzaG9lc1RvbmUiOiIwYjBiMGIiLCJiZWx0VG9uZSI6IjRjMmMxMiJ9/1/show.png"},
        {id:3,name:"Leen",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxMiIsIlNob2VzIjoiNCIsIlBhbnRzIjoiMSIsIlRvcCI6IjE2IiwiSmFja2V0IjoiNCIsIkhhaXIiOiIyNiIsInNraW5Ub25lIjoiZjRiODhmIiwiZXllc1RvbmUiOiI1NDJhMGUiLCJwYW50c1RvbmUiOiI3YjNmMDAiLCJwYW50c1RvbmUyIjoiN2IzZjAwIiwidG9wVG9uZSI6ImY3YWJjYiIsInNob2VzVG9uZSI6IjE4MTIwMCIsImphY2tldFRvbmUiOiJmYWYwZTYiLCJqYWNrZXRUb25lMiI6ImZmZjBkYiJ9/1/show.png"},
        {id:4,name:"Annie",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxMCIsIkV5ZXMiOiIxIiwiU2hvZXMiOiIxIiwiUGFudHMiOiIxIiwiVG9wIjoiMTMiLCJCZWx0IjoiMSIsIkphY2tldCI6IjEiLCJIYWlyIjoiMjMiLCJza2luVG9uZSI6ImY0Yjg4ZiIsImV5ZXNUb25lIjoiNTQyYTBlIiwicGFudHNUb25lIjoiMDYwODEyIiwidG9wVG9uZSI6IjM2MzYzNiIsInNob2VzVG9uZSI6IjE4MTIwMCIsImphY2tldFRvbmUiOiIxZDFkMWQifQ==/1/show.png"},
        {id:5,name:"Mulan",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiI4IiwiU2hvZXMiOiIxIiwiUGFudHMiOiIzIiwiVG9wIjoiMTMiLCJIYWlyIjoiMjIiLCJwYW50c1RvbmUiOiIwNTIwNTYiLCJwYW50c1RvbmUyIjoiMDUyMDU2IiwidG9wVG9uZSI6IjAwMDAwMCIsInRvcFRvbmUyIjoiODAwMDAwIiwic2hvZXNUb25lIjoiMGIwYjBiIiwiYmVsdFRvbmUiOiI0YzJjMTIifQ==/1/show.png"},
        {id:6,name:"Shahed",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiI1IiwiU2hvZXMiOiIxIiwiUGFudHMiOiIzIiwiVG9wIjoiMiIsIkhhaXIiOiIyOCIsImV5ZXNUb25lIjoiNTc1YzFhIiwiaGFpclRvbmUiOiIzZDIzMTQiLCJwYW50c1RvbmUiOiIwNTIwNTYiLCJwYW50c1RvbmUyIjoiMDUyMDU2IiwidG9wVG9uZSI6IjAzNDQyZSIsInRvcFRvbmUyIjoiODAwMDAwIiwic2hvZXNUb25lIjoiOWQ2ZDUxIiwiYmVsdFRvbmUiOiI0YzJjMTIifQ==/1/show.png"},
        {id:7,name:"Wiam",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxNCIsIkV5ZXMiOiIxIiwiTW91dGgiOiIxNCIsIlNob2VzIjoiMSIsIlBhbnRzIjoiMyIsIlRvcCI6IjMiLCJIYWlyIjoiMjYiLCJleWVzVG9uZSI6IjU3M2UxOCIsImhhaXJUb25lIjoiM2QyMzE0IiwicGFudHNUb25lIjoiMDUyMDU2IiwicGFudHNUb25lMiI6IjA1MjA1NiIsInRvcFRvbmUiOiI5ZTAwMmQiLCJ0b3BUb25lMiI6IjllMDAyZCIsInNob2VzVG9uZSI6IjA5MTEyMCIsImJlbHRUb25lIjoiNGMyYzEyIn0=/1/show.png"},
        {id:8,name:"Maysam",character:"http://www.avatarsinpixels.com/minipix/eyJIYWlyTG93ZXIiOiIxIiwiRXllcyI6IjEiLCJNb3V0aCI6IjQiLCJTaG9lcyI6IjEiLCJQYW50cyI6IjEiLCJUb3AiOiIyIiwiSmFja2V0IjoiMSIsIkhhaXIiOiIyMyIsImV5ZXNUb25lIjoiNTk0YTBmIiwiaGFpclRvbmUiOiIzZDIzMTQiLCJwYW50c1RvbmUiOiI0MjVkOGMiLCJwYW50c1RvbmUyIjoiMDUyMDU2IiwidG9wVG9uZSI6IjBiMGI0NSIsInRvcFRvbmUyIjoiOWUwMDJkIiwic2hvZXNUb25lIjoiMDAwMDAwIiwiYmVsdFRvbmUiOiI0YzJjMTIiLCJqYWNrZXRUb25lIjoiMDAwMDAwIn0=/1/show.png"}
    ]
    const [hoveredCharacterName, setHoveredCharacterName] = useState(null);

    const handleMouseEnter = (characterId, characterName) => {
      setHoveredCharacterName(characterName);
    };
  
    const handleMouseLeave = () => {
      setHoveredCharacterName(null);
    };
  
    return (
        <div className="kk">
          <h1>APT. LIFE ORGANIZER</h1>
          <h2>INSPIRED BY</h2>
          <div className="titlek">KETER KINGDOM</div>
          <h1>STARRING:</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {characters.map((ch) => (
              <div
                key={ch.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', // Center items horizontally
                  margin: '1px', // Add some spacing between characters
                }}
              >
                <img
                  src={ch.character}
                  style={{ width: '8rem', height: '8rem' }}
                  onMouseEnter={() => handleMouseEnter(ch.id, ch.name)}
                  onMouseLeave={handleMouseLeave}
                  alt={ch.name}
                />
                {hoveredCharacterName === ch.name && (
                  <label style={{ marginTop: '5px',fontWeight:"400"}}>{ch.name}</label>
                )}
              </div>
            ))}
          </div>
        </div>
      );
}

export default KK;