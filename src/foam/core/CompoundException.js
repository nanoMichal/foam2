/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

// TODO: indentation doesn't follow styleguide

foam.CLASS({
    name: 'CompoundException',
    package: 'foam.core',
    implements: [ 'foam.core.ExceptionInterface' ],
    javaExtends: 'RuntimeException',
    javaImports: [
        'foam.core.ExceptionInterface',
        'java.util.ArrayList'
    ],

    properties:  [
        {
            class: 'Object',
            name: 'exceptions',
            javaType: 'ArrayList',
            javaFactory: 'return new ArrayList<RuntimeException>();'
        },
        {
            class: 'Object',
            name: 'sb',
            javaType: 'ThreadLocal',
            javaFactory: `return new ThreadLocal<StringBuilder>() {
                @Override
                protected StringBuilder initialValue() {
                    return new StringBuilder();
                }
            
                @Override
                public StringBuilder get() {
                    StringBuilder b = super.get();
                    b.setLength(0);
                    return b;
                }
            };`
        }
    ],

    methods:  [
        {
            // TODO: cloning this property from ExceptionInterface creates a bug.
            name: 'getClientRethrowException',
            documentation: 
            `If an exception is intended to go to the client, this
            returns an exception object; it returns null otherwise.

            Note that the exception returned by this property is the
            one that should be re-thrown. This is particularly useful
            for CompoundException where the CompoundException itself
            is not intended to be re-thrown but any of its child
            exceptions might be.`,
            type: 'RuntimeException',
            visibility: 'public',
            javaCode: `ArrayList<RuntimeException> exceptions = getExceptions();
            for ( RuntimeException re : exceptions ) {
                if ( re instanceof ExceptionInterface ) {
                    RuntimeException clientE =
                        ((ExceptionInterface) re).getClientRethrowException();
                    if ( clientE != null ) {
                        return clientE;
                    }
                }
            }
            return null;`
        },
        {
            name: 'add',
            args: [{ name: 't', javaType: 'Throwable' }],
            javaCode: 'getExceptions().add(t);'
        },
        {
            name: 'maybeThrow',
            javaCode: 'if ( getExceptions().size() != 0 ) throw this;'
        },
        {
            name: 'getMessage',
            type: 'String',
            javaType: `
            var str = getSb().get();
            var size = getExceptions().size();
        
            for ( int i = 0; i < size; i++ ) {
              Throwable t = (Throwable) getExceptions().get(i);
              var counter = i + 1;
        
              str.append('[').append(counter).append('/').append(size).append("] ")
                .append(t);
              while ( t.getCause() != null ) {
                t = t.getCause();
                str.append(", Cause: ").append(t);
              }
              if ( counter < size ) str.append(';');
            }
            return str.toString();`
        }
    ]

})