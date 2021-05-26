CREATE TABLE IF NOT EXISTS notifications (
                id integer PRIMARY KEY AUTOINCREMENT,
                evt varchar(100),
                execution varchar(100),
                owner integer,
                bot varchar(100)                
              );

