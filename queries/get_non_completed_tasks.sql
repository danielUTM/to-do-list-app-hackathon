SELECT t.title
     , t.summary
     , t.created_at
     , t.due_by
     , u.username

  FROM tasks AS t

INNER JOIN users AS u
ON t.assigned_to = u.id

WHERE NOT completed;