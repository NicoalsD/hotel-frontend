# Manual de usuario - Sistema de gestión hotelera

Este manual describe, paso a paso, cómo usar la aplicación web del hotel para buscar habitaciones, reservar, gestionar una reserva, registrar el check-in y el check-out, agregar servicios y consultar la factura.

## Navegación principal

La barra superior muestra tres secciones:

- **Inicio**: página de bienvenida con búsqueda rápida.
- **Buscar**: consulta de disponibilidad de habitaciones por fechas y tipo.
- **Reservas**: buscador por código y listado de todas las reservas.

## 1. Buscar habitaciones

1. Ingrese a la sección **Buscar** desde la barra superior.
2. Seleccione la **fecha de entrada** y la **fecha de salida**. La fecha de salida debe ser posterior a la de entrada.
3. Opcionalmente, filtre por **tipo de habitación** (individual, doble o suite).
4. Pulse **Buscar disponibilidad**.
5. Revise las tarjetas de habitación. Cada una indica si está **Disponible** o **No disponible**, el número de noches y el total estimado.
6. En las habitaciones disponibles, pulse **Seleccionar habitación** para continuar con la reserva.

La leyenda de disponibilidad, visible en la misma página, explica el significado de cada color y etiqueta.

## 2. Reservar una habitación

El proceso de reserva tiene tres pasos, indicados en la barra de progreso:

1. **Habitación**: revise la habitación seleccionada y el desglose de tarifas por noche. Las noches de temporada alta y baja se muestran identificadas. El total se actualiza si cambia alguna fecha.
2. **Datos del huésped**: complete el nombre completo, el número de documento, el correo electrónico y el teléfono. Todos los campos son obligatorios; si falta alguno o el correo no es válido, el formulario indica el error debajo del campo.
3. **Confirmación**: verifique los datos y pulse el botón para confirmar la reserva.

Al confirmar, se muestra un mensaje de éxito con el código de la reserva (formato RES-n, por ejemplo RES-1001) y el sistema lo lleva a la gestión de esa reserva.

## 3. Gestionar reservas

1. Ingrese a la sección **Reservas**.
2. Para ubicar una reserva específica, escriba su código (RES-n) en el campo **Código de reserva** y pulse **Buscar reserva**. Si el código no existe, el sistema lo indica.
3. Para revisar todas las reservas, use el listado inferior. Cada fila muestra el código, el huésped, la habitación, las fechas y el estado.
4. Use los botones de filtro (**Todas**, **Confirmada**, **Check-in realizado** y **Finalizada**) para mostrar solo las reservas de un estado.
5. Pulse **Gestionar** en la fila de la reserva para abrir su panel de gestión.

El panel muestra el resumen de la reserva, los datos del huésped, los servicios adicionales, las acciones de estadía y la llave digital.

## 4. Check-in

El check-in registra la llegada del huésped y emite la llave digital de la habitación.

1. Abra la reserva desde **Reservas** con el botón **Gestionar**.
2. En la sección **Acciones de estadía**, pulse **Check-in**.
3. Revise el mensaje de confirmación y pulse **Realizar check-in**.
4. Cuando el proceso termina, aparece la notificación **Check-in realizado** y la tarjeta **Llave digital** muestra el código de la llave.

El botón **Check-in** solo está habilitado para reservas confirmadas. Si pasa el cursor sobre el botón deshabilitado, aparece un mensaje que explica el motivo (por ejemplo, que el check-in ya fue realizado o que la estadía finalizó).

## 5. Agregar servicios

Los servicios adicionales se pueden agregar mientras la reserva esté confirmada o con check-in realizado.

1. Abra la reserva desde **Reservas**.
2. En la sección **Servicios adicionales** revise el catálogo. Cada servicio indica su descripción, su precio y si el cobro es de **Precio único** o **Por noche**.
3. Pulse **Agregar** junto al servicio deseado. Mientras se registra, el botón muestra un indicador de progreso.
4. Al terminar, aparece la notificación **Servicio agregado** y el servicio queda en la tabla de servicios agregados.

Si la reserva está finalizada, el catálogo se muestra deshabilitado y un aviso indica que los servicios solo pueden agregarse a reservas activas.

## 6. Check-out

El check-out cierra la estadía, genera la factura y revoca la llave digital.

1. Abra la reserva que tiene check-in realizado.
2. En **Acciones de estadía**, pulse **Check-out**.
3. Lea el mensaje de confirmación y pulse **Realizar check-out**.
4. El sistema lo lleva automáticamente a la factura de la reserva y muestra la notificación **Check-out realizado**.

Antes de confirmar, verifique que el huésped haya terminado de consumir servicios, porque después del check-out ya no se pueden agregar. El botón **Check-out** permanece deshabilitado hasta que se haya realizado el check-in.

## 7. Factura

La factura la genera el servidor al realizar el check-out.

1. Desde el panel de la reserva finalizada, o tras el check-out, se muestra la factura con su número (FAC).
2. La factura incluye los datos de la estadía, el detalle de las líneas (habitación y servicios), los subtotales, el **IVA (19%)** y el **Total** a pagar.
3. Al final aparece el código de la llave digital asociada a la estadía.
4. Para imprimir o guardar la factura, pulse **Imprimir**. Los botones de navegación no se incluyen en la impresión.
5. Use **Volver a la reserva** para regresar al panel de gestión.

Los montos se muestran en dólares estadounidenses (USD).

## Resumen del flujo

1. **Buscar** la disponibilidad por fechas y tipo de habitación.
2. **Reservar** la habitación y registrar los datos del huésped.
3. **Gestionar** la reserva desde el listado de reservas.
4. Realizar el **check-in** al llegar el huésped.
5. **Agregar servicios** durante la estadía.
6. Realizar el **check-out** al salir y consultar la **factura**.
