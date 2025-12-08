# Índice de Firestore para Reseñas

## Estado Actual
El sistema de reseñas funciona correctamente sin índices especiales, ya que filtra los datos en memoria.

## Optimización (Opcional)

Si quieres optimizar las consultas de Firestore, puedes crear el siguiente índice compuesto:

### Crear Índice en Firestore

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto
3. Ve a **Firestore Database** > **Indexes**
4. Haz clic en **Create Index**
5. Configura:
   - **Collection ID**: `reviews`
   - **Fields to index**:
     - Campo: `published` | Order: Ascending
     - Campo: `createdAt` | Order: Descending
   - **Query scopes**: Collection

6. Haz clic en **Create**

### Después de crear el índice

Una vez creado el índice, puedes optimizar la query en `netlify/functions/reviews.js` línea ~172:

```javascript
const reviewsSnapshot = await db.collection('reviews')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(100)
    .get();
```

Esto hará la consulta más eficiente, pero **no es necesario** para que funcione el sistema.
